import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "localhost" });

export const apiSlice = createApi({
  baseQuery,
  // tagTypes: ["Products","Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
