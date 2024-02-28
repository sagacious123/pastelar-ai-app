import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import { GetActivityLogsPayload } from "./interface";

export const activityApi: any = createApi({
  reducerPath: "getActivityApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/activity-log` }),
  endpoints: (builder) => ({
    updateActivity: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/mark-read/${payload.activityId}`,
        method: "PUT",
        body: payload,
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    getActivity: builder.query<any, GetActivityLogsPayload>({
      query: (payload) => ({
        url: `/user-activity-logs`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
  }),
});

export const { useUpdateActivityMutation, useGetActivityQuery } = activityApi;
