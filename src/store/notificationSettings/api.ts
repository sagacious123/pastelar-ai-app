import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import {
  updateNotificationSettingsPayload,
  updateNotificationSettingsResponse,
} from "./interface";

export const notificationSettingsApi: any = createApi({
  reducerPath: "notificationSettingsApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/notification-settings` }),
  endpoints: (builder) => ({
    updateNotificationSettings: builder.mutation<
      updateNotificationSettingsResponse,
      updateNotificationSettingsPayload
    >({
      query: (payload) => ({
        url: `/save-settings`,
        method: "POST",
        body: payload,
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    getSettings: builder.query<updateNotificationSettingsResponse, void>({
      query: () => ({
        url: ``,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
  }),
});

export const { useUpdateNotificationSettingsMutation, useGetSettingsQuery } =
  notificationSettingsApi;
