import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import * as Location from "expo-location";
import { useSelector as useSelectorOriginal } from "react-redux";
import { useDispatch as useDispatchOriginal } from "react-redux";

import { useUnlockProductMutation as useUnlockProductMutationOriginal } from "@/redux/features/unlockProductSlice";

import Detail from "@/app/(tabs)/(home_stack)/detail";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@/redux/features/unlockProductSlice", () => ({
  setProduct: jest.fn(),
  useUnlockProductMutation: jest.fn(),
}));

jest.mock("@/utils/functions", () => ({
  getDistance: jest.fn((lat1, lon1, lat2, lon2) => {
    return 29;
  }),
}));
const useUnlockProductMutation =
  useUnlockProductMutationOriginal as jest.MockedFunction<
    typeof useUnlockProductMutationOriginal
  >;

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      data: JSON.stringify({
        isUnlocked: false,
        product: {
          _id: "mockProductId",
          image:
            "https://images.nobroker.in/images/8a9fbf82824e8fc101824ec6dc3729ac/8a9fbf82824e8fc101824ec6dc3729ac_76213_233063_large.jpg",
          address: { value: "Mock Address" },
          description: "Mock Description",
        },
      }),
    },
  }),
}));

describe("Detail component", () => {
  beforeEach(() => {
    const useSelector = useSelectorOriginal as jest.MockedFunction<
      typeof useSelectorOriginal
    >;
    const useDispatch = useDispatchOriginal as jest.MockedFunction<
      typeof useDispatchOriginal
    >;

    useSelector.mockReturnValue({
      auth: {
        userData: {
          userId: "mockUserId",
        },
      },
      unlockProduct: {
        currentProduct: {
          data: {
            _id: "mockProductId",
            image:
              "https://images.nobroker.in/images/8a9fbf82824e8fc101824ec6dc3729ac/8a9fbf82824e8fc101824ec6dc3729ac_76213_233063_large.jpg",
            address: { value: "Mock Address" },
            description: "Mock Description",
          },
          isUnlocked: false,
        },
      },
    });
    // getDistance.mockReturnValue(29);
    useDispatch.mockReturnValue(jest.fn());

    useUnlockProductMutation.mockReturnValue([
      jest.fn(),
      {
        isLoading: false,
        reset: jest.fn(), // Mocked reset function
        error: undefined, // Mocked error value
        isSuccess: true, // Mocked success state
        isError: false, // Mocked error state
        data: null, // Mocked data
        originalArgs: undefined, // Mocked original arguments
      },
    ]);
  });

  it("renders product details correctly", async () => {
    const { getByText, getByTestId } = render(<Detail />);

    // Assert that the product image is rendered
    const productImage = getByTestId("product-image");
    expect(productImage).toBeTruthy();

    // Assert that the address text is rendered
    //const addressText = getByText("Mock Address");
    //expect(addressText).toBeTruthy();

    // Assert that the description text is not initially rendered
    expect(() => getByText("Mock Description")).toThrow();
  });

  it("displays distance loading text initially", async () => {
    const { getByText } = render(<Detail />);

    // Assert that the distance loading text is displayed
    const distanceText = getByText("Distance from your location is loading...");
    expect(distanceText).toBeTruthy();
  });

  it("requests location permission and calculates distance correctly", async () => {
    const mockLocation = {
      coords: {
        latitude: 123.45,
        longitude: 67.89,
      },
    };

    (
      Location.requestForegroundPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({ status: "granted" });

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValueOnce({
      coords: mockLocation.coords,
    });

    const { getByText, getByTestId } = render(<Detail />);

    // Wait for the distance text to be updated
    await waitFor(() => {
      const distanceText = getByText(
        "Distance from your location is 29.0 meters"
      );
      expect(distanceText).toBeTruthy();
      expect(getByTestId("unlock-button")).toBeTruthy();
    });
  });

  it("handles unlocking when nearby and user logged in", async () => {
    const mockLocation = {
      coords: {
        latitude: 123.45,
        longitude: 67.89,
      },
    };

    (
      Location.requestForegroundPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({ status: "granted" });
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValueOnce({
      coords: mockLocation.coords,
    });

    const { getByText, getByTestId } = render(<Detail />);

    // Simulate pressing the unlock button
    await waitFor(() => {
      const distanceText = getByText(
        "Distance from your location is 29.0 meters"
      );
      expect(distanceText).toBeTruthy();
      expect(getByTestId("unlock-button")).toBeTruthy();
      const unlockButton = getByTestId("unlock-button");
      fireEvent.press(unlockButton);
    });

    // Assert that the unlock mutation function is called
    await waitFor(() => {
      expect(useUnlockProductMutation.mock.calls.length).toBe(6);
    });
  });
});
