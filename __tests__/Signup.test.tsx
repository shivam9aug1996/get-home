import React from "react";

import { useSignupMutation as useSignupMutationOriginal } from "@/redux/features/authSlice";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { validateSignupForm } from "@/utils/functions";
import Toast from "react-native-root-toast";
import SignupScreen from "@/app/signup";

jest.mock("@/redux/features/authSlice", () => ({
  useSignupMutation: jest.fn(),
}));
jest.mock("@/utils/functions", () => ({
  validateSignupForm: jest.fn(),
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

const useSignupMutation = useSignupMutationOriginal as jest.MockedFunction<
  typeof useSignupMutationOriginal
>;
describe("SignupScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  useSignupMutation.mockReturnValue([
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

  it("should render signup screen correctly", () => {
    const tree = renderer.create(<SignupScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should show validation error toast if login credentials are invalid", async () => {
    const { getByTestId } = render(<SignupScreen />);
    (validateSignupForm as jest.Mock).mockReturnValue("Invalid credentials");

    fireEvent.press(getByTestId("signup-button"));
    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith("Invalid credentials", {
        position: Toast.positions.TOP,
      });
    });
  });
});
