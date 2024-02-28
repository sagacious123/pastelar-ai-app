import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import {
  AddCampaignResponse,
  AddCampaignUpdate,
  CampaignUploadFilesPayload,
  CampaignUploadFilesResponse,
  GetCampaignUpdatesResponse,
} from "./interface";

export const campaignUpdateApi: any = createApi({
  reducerPath: "campaignUpdateApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/campaign-updates` }),
  endpoints: (builder) => ({
    getAllUpdates: builder.query<GetCampaignUpdatesResponse, string | undefined>({
      query: (payload) => ({
        url: `/${payload}/posts`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    getSingleUpdate: builder.query<any, string | undefined>({
      query: (payload) => ({
        url: `/${payload}`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    addPost: builder.mutation<Partial<AddCampaignResponse>, AddCampaignUpdate & { campaignId: string }>({
      query: (payload) => ({
        url: `/${payload.campaignId}/add-post`,
        method: "POST",
        body: payload,
      }),
    }),
    fileUpload: builder.mutation<CampaignUploadFilesResponse, CampaignUploadFilesPayload>({
      query: ({ files, fileClass, postUpdateId }) => ({
        url: `/files-upload/?fileClass=${fileClass}&postUpdateId=${postUpdateId}`,
        method: "POST",
        body: files,
      }),
    }),
    likeUpdate: builder.mutation<void, { postId: string }>({
      query: (payload) => ({
        url: `/${payload.postId}/toggle-like-unlike`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllUpdatesQuery,
  useGetSingleUpdateQuery,
  useAddPostMutation,
  useFileUploadMutation,
  useLikeUpdateMutation,
  useUnlikeUpdateMutation,
} = campaignUpdateApi;
