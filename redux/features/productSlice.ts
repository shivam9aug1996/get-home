import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

const normalizeProducts = (products: any) => {
  const productIds: any = [];
  const productsById: any = {};

  products.forEach((product: any) => {
    productIds.push(product._id);
    productsById[product._id] = product;
  });

  return { productIds, productsById };
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => ({
        url: "/properties",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        const normalizedData = normalizeProducts(response?.properties);
        return normalizedData;
      },
    }),
    // fetchAllProducts: builder.query({
    //   query: (data) => ({
    //     url: "/allProducts",
    //     method: "GET",
    //     params: {
    //       search: data?.search,
    //     },
    //   }),
    //   transformResponse: (response) => {
    //     const normalizedData = normalizeProducts(response?.products);
    //     return normalizedData;
    //   },
    // }),
  }),
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const { useFetchProductsQuery } = productApi;

export default productSlice.reducer;
