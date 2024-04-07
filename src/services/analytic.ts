import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const analyticApi = createApi({
  reducerPath: 'analyticApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/api/analytics',
  }),
  tagTypes: ['Analytics'],
  endpoints: (builder) => ({
    getAnalytics: builder.query<any, void>({
      query: () => '/analytics',
      providesTags: ['Analytics'],
    }),
    getAnalyst: builder.query<any, void>({
      query: () => '/analyst',
      providesTags: ['Analytics'],
    }),
    getAnalystMonth: builder.query<any, void>({
      query: () => '/analytics-month',
      providesTags: ['Analytics'],
    }),
  }),
})

export const {
  useGetAnalyticsQuery,
  useGetAnalystQuery,
  useGetAnalystMonthQuery,
} = analyticApi
