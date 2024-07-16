import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentType } from "../types";

export const creosApi = createApi({
  reducerPath: "creosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sandbox.creos.me/api/v1/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], void>({
      query: () => `comment/`,
    }),
  }),
});

export const { useGetCommentsQuery } = creosApi;
