import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentType, DesignerResponseType, IssueDetailedType, DesignerStatType, ProjectType } from "../types";
import { convertToDesignerStat } from "../utils";

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
    getIssues: builder.query<IssueDetailedType[], void>({
      query: () => ({
        url: `issue/`,
      }),
    }),

    getDesigners: builder.query<
      DesignerResponseType,
      { page?: number; ordering?: string; status?: string; key?: string }
    >({
      query: (arg) => {
        return {
          url: "designer/",
          params: { ...arg },
        };
      },
    }),
    getDesignersStats: builder.query<DesignerStatType[], void>({
      query: () => ({
        url: `issue/`,
        params: { status: "Done" },
      }),
      transformResponse: (response: IssueDetailedType[]) => convertToDesignerStat(response),
    }),

    getAllDoneIssues: builder.query<IssueDetailedType[], void>({
      query: () => ({
        url: `issue/`,
        params: { status: "Done" },
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetDesignersStatsQuery,
  useGetProjectsQuery,
  useGetDesignersQuery,
  useGetIssuesQuery,
  useGetAllDoneIssuesQuery,
} = creosApi;

// ошибка это проблема RTK. Баг описан в их Issues на GitHub
