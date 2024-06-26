import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { useFetchProductsQuery } from "@/redux/features/productSlice";
import { useFetchUnlockProductsQuery } from "@/redux/features/unlockProductSlice";
import ProductList from "@/app/(tabs)/(home_stack)";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@/redux/features/productSlice", () => ({
  useFetchProductsQuery: jest.fn(),
}));

jest.mock("@/redux/features/unlockProductSlice", () => ({
  useFetchUnlockProductsQuery: jest.fn(),
}));

describe("ProductList component", () => {
  it("renders product list correctly", async () => {
    const mockProductData = {
      isLoading: false,
      isError: false,
      error: null,
      data: {
        productsById: {
          "1": {
            _id: "1",
            image:
              "https://images.nobroker.in/images/8a9fbf82824e8fc101824ec6dc3729ac/8a9fbf82824e8fc101824ec6dc3729ac_76213_233063_large.jpg",
            address: { value: "Address 1" },
          },
          "2": {
            _id: "2",
            image:
              "https://images.nobroker.in/images/8a9fbf82824e8fc101824ec6dc3729ac/8a9fbf82824e8fc101824ec6dc3729ac_76213_233063_large.jpg",
            address: { value: "Address 2" },
          },
        },
        productIds: ["1", "2"],
      },
      refetch: jest.fn(),
      isFetching: false,
    };

    const mockUnlockFetchData = {
      data: {
        unlockedProperties: [{ propertyId: "1" }],
      },
    };

    (useFetchProductsQuery as jest.Mock).mockReturnValue(mockProductData);
    (useFetchUnlockProductsQuery as jest.Mock).mockReturnValue(
      mockUnlockFetchData
    );

    const { getByText } = render(<ProductList />);

    await waitFor(() => {
      expect(getByText("Address 1")).toBeTruthy();
      expect(getByText("Address 2")).toBeTruthy();
    });
  });
  it("renders product list loader", async () => {
    const mockProductData = {
      isLoading: true,
      isError: false,
      error: null,
      data: null,
      refetch: jest.fn(),
      isFetching: false,
    };

    const mockUnlockFetchData = {
      data: {
        unlockedProperties: [{ propertyId: "1" }],
      },
    };

    (useFetchProductsQuery as jest.Mock).mockReturnValue(mockProductData);
    (useFetchUnlockProductsQuery as jest.Mock).mockReturnValue(
      mockUnlockFetchData
    );

    const { getByTestId } = render(<ProductList />);

    await waitFor(() => {
      const item = getByTestId("item-0");
      expect(item).toBeTruthy();
    });
  });
});
