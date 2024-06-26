import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const unlockProductApi = createApi({
  reducerPath: "unlockProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["unlockProducts"],
  endpoints: (builder) => ({
    fetchUnlockProducts: builder.query({
      query: (data) => ({
        url: "/properties/unlock",
        method: "GET",
        params: {
          userId: data?.userId,
        },
      }),
      providesTags: ["unlockProducts"],
    }),
    unlockProduct: builder.mutation({
      query: (data) => ({
        url: "/properties/unlock",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unlockProducts"],
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

const unlockProductSlice = createSlice({
  name: "unlockProductSlice",
  initialState: {
    currentProduct: { data: {}, isUnlocked: false },
  },
  reducers: {
    setProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { useFetchUnlockProductsQuery, useUnlockProductMutation } =
  unlockProductApi;
export const { setProduct } = unlockProductSlice.actions;

export default unlockProductSlice.reducer;
