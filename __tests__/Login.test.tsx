import React from "react";

import { useLoginMutation as useLoginMutationOriginal } from "@/redux/features/authSlice";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { validateLoginForm } from "@/utils/functions";
import Toast from "react-native-root-toast";
import LoginScreen from "@/app/login";

jest.mock("@/redux/features/authSlice", () => ({
  useLoginMutation: jest.fn(),
}));
jest.mock("@/utils/functions", () => ({
  validateLoginForm: jest.fn(),
}));
jest.mock("react-native-root-toast", () => ({
  show: jest.fn(),
  hide: jest.fn(),
  positions: {
    TOP: "top",
    BOTTOM: "bottom",
    CENTER: "center",
  },
}));

const useLoginMutation = useLoginMutationOriginal as jest.MockedFunction<
  typeof useLoginMutationOriginal
>;
describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  useLoginMutation.mockReturnValue([
    jest.fn(),
    {
      isLoading: false,
      reset: jest.fn(),
      error: undefined,
      isSuccess: false,
      isError: false,
      data: null,
      originalArgs: undefined,
    },
  ]);

  it("should render login screen correctly", () => {
    const tree = renderer.create(<LoginScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should show validation error toast if login credentials are invalid", async () => {
    const { getByTestId } = render(<LoginScreen />);
    (validateLoginForm as jest.Mock).mockReturnValue("Invalid credentials");

    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith("Invalid credentials", {
        position: Toast.positions.TOP,
      });
    });
  });
});
