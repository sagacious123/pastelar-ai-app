import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import { IResponse, User } from "../auth/interface";
import {
  SingleCampaignResponse,
  AllCampaignsResponse,
  SearchCampaignsQueryPayload,
  CreateCampaignPayload,
  UpdateCampaignPayload,
  CampaignFilesUploadPayload,
  BackCampaignPayload,
  BackCampaignResponse,
  GetExporterStatsResponse,
  GetBackerStatsResponse,
  GetExporterProfileStatsResponse,
  SubmitCampaignPayload,
  SubmitCampaign,
  DeleteCampaignResponse,
  DeleteCampaignPayload,
} from "./interface";
import { convertObjectToURLParams } from "utilities";

export const campaignsApi: any = createApi({
  reducerPath: "campaignsApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/campaigns` }),
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<
      AllCampaignsResponse,
      SearchCampaignsQueryPayload
    >({
      query: (payload) => ({
        url: `?${convertObjectToURLParams(payload)}`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    getCampaign: builder.query<SingleCampaignResponse, string | undefined>({
      query: (payload) => ({
        url: `/${payload}/details`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    updateCampaign: builder.mutation<
      SingleCampaignResponse,
      UpdateCampaignPayload
    >({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
    }),
    createCampaign: builder.mutation<
      SingleCampaignResponse,
      CreateCampaignPayload
    >({
      query: (payload) => ({
        url: "/create-campaign",
        method: "POST",
        body: payload,
      }),
    }),
    submitCampaign: builder.mutation<SubmitCampaign, SubmitCampaignPayload>({
      query: (payload) => ({
        url: `/${payload.campaignId}/submit-campaign`,
        method: "POST",
        body: payload,
      }),
    }),
    uploadCampaignDocument: builder.mutation<
      SingleCampaignResponse,
      CampaignFilesUploadPayload
    >({
      query: ({ files, fileClass, campaignId }) => ({
        url: `/files-upload?campaignId=${campaignId}&fileClass=${fileClass}`,
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        body: files,
      }),
    }),
    uploadCampaignMediaFiles: builder.mutation<
      SingleCampaignResponse,
      CampaignFilesUploadPayload
    >({
      query: ({ files, fileClass, campaignId }) => ({
        url: `/files-upload?campaignId=${campaignId}&fileClass=${fileClass}`,
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        body: files,
      }),
    }),
    backCampaign: builder.mutation<BackCampaignPayload, BackCampaignResponse>({
      query: (payload) => ({
        url: "/back-campaign",
        method: "POST",
        body: payload,
      }),
    }),
    exporterDashboardStats: builder.query<GetExporterStatsResponse, void>({
      query: () => ({
        url: `/exporterDashboardStat`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    backerDashboardStats: builder.query<GetBackerStatsResponse, void>({
      query: () => ({
        url: `/backerDashboardStat`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    exporterProfileStats: builder.query<
      GetExporterProfileStatsResponse,
      string | undefined
    >({
      query: (payload) => ({
        url: `/exporter-campaign-profile-stat/${payload}`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    deleteCampaign: builder.mutation<
      DeleteCampaignResponse,
      DeleteCampaignPayload
    >({
      query: (payload) => ({
        url: `/delete-campaign/${payload}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  useSubmitCampaignMutation,
  useGetAllCampaignsQuery,
  useGetCampaignQuery,
  useUpdateCampaignMutation,
  useUploadCampaignDocumentMutation,
  useUploadCampaignMediaFilesMutation,
  useBackCampaignMutation,
  useExporterDashboardStatsQuery,
  useBackerDashboardStatsQuery,
  useExporterProfileStatsQuery,
} = campaignsApi;
