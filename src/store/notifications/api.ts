import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import { IResponse } from "../auth/interface";
import {
  FetchNotificationsResponse,
  GetBadgeAlertPayload,
  GetBadgeAlertResponse,
} from "./interface";
import { convertObjectToURLParams } from "utilities/general";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/notifications` }),
  endpoints: (builder) => ({
    readAllNotifications: builder.mutation<IResponse, string | void>({
      query: (payload) => ({
        url: "",
        method: "PATCH",
        body: payload,
      }),
    }),
    readNotificationById: builder.mutation<IResponse, string | void>({
      query: (payload) => ({
        url: `/${payload}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    fetchAllNotifications: builder.query<
      FetchNotificationsResponse,
      string | void
    >({
      query: (payload) => ({
        url: "",
        method: "GET",
        body: payload,
      }),
    }),
    getBadgeAlert: builder.query<GetBadgeAlertResponse, GetBadgeAlertPayload>({
      query: (payload) => ({
        url: `?${convertObjectToURLParams(payload)}`,
        method: "GET",
        body: payload,
      }),
    }),
    deleteAllNotifications: builder.mutation<IResponse, string | void>({
      query: (payload) => ({
        url: "",
        method: "DELETE",
        body: payload,
      }),
    }),
    deleteNotificationById: builder.mutation<IResponse, string | void>({
      query: (payload) => ({
        url: `/${payload}`,
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useReadAllNotificationsMutation,
  useReadNotificationByIdMutation,
  useFetchAllNotificationsQuery,
  useGetBadgeAlertQuery,
  useDeleteAllNotificationsMutation,
  useDeleteNotificationByIdMutation,
} = notificationsApi;
