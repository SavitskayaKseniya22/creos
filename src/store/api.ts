import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentType, DesignerResponseType, IssueDetailedType, ParsedIssueArrayType, ProjectType } from "../types";
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
    getProjects: builder.query<ProjectType[], void>({
      query: () => `project/`,
    }),
    getDesigners: builder.query<
      DesignerResponseType,
      { page?: number; ordering?: string; status?: string; key?: string }
    >({
      query: (arg) => {
        console.log(arg);
        return {
          url: "designer/",
          params: { ...arg },
        };
      },
    }),
    getDoneIssues: builder.query<ParsedIssueArrayType[], void>({
      query: () => ({
        url: `issue/`,
        params: { status: "Done" },
      }),
      transformResponse: (response: IssueDetailedType[]) => parseIssueArray(response),
    }),
    getAllIssues: builder.query<ParsedIssueArrayType[], void>({
      query: () => ({
        url: `issue/`,
        params: { status: "Done" },
      }),
      transformResponse: (response: IssueDetailedType[]) => parseIssueArray(response),
    }),
  }),
});

export const { useGetCommentsQuery, useGetDoneIssuesQuery, useGetProjectsQuery, useGetDesignersQuery } = creosApi;
