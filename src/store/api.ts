import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentType, IssueDetailedType, ParsedIssueArrayType } from "../types";
import { parseIssueArray } from "../utils";

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
    getDoneIssues: builder.query<ParsedIssueArrayType[], void>({
      query: () => ({
        url: `issue/`,
        params: { status: "Done" },
      }),
      transformResponse: (response: IssueDetailedType[]) => parseIssueArray(response),
    }),
  }),
});

export const { useGetCommentsQuery, useGetDoneIssuesQuery } = creosApi;
