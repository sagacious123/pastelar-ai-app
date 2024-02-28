import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import {
  UpdateInputsPayload,
  UpdateVerificationDocumentPayload,
  UpdateVerificationDocumentResponse,
  VerificationDataResponse,
} from "./interface";

export const verificationCenterApi: any = createApi({
  reducerPath: "verificationCenterApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/verification-settings` }),
  endpoints: (builder) => ({
    updateInputsFields: builder.mutation<
      UpdateVerificationDocumentResponse,
      UpdateInputsPayload
    >({
      query: ({ payload, fileId, uploadQuery }) => ({
        url: `/text-fields-update?uploadQuery=${uploadQuery}&fileId=${fileId}`,
        method: "POST",
        body: payload,
      }),
    }),
    updateRejectedDocuments: builder.mutation<
      UpdateVerificationDocumentResponse,
      UpdateVerificationDocumentPayload
    >({
      query: ({ files, fileId, fileClass, uploadQuery }) => ({
        url: `/verification-files-upload?fileClass=${fileClass}&uploadQuery=${uploadQuery}&fileId=${fileId}`,
        method: "POST",
        body: files,
      }),
    }),
    getRejectedDocuments: builder.query<VerificationDataResponse, void>({
      query: () => ({
        url: `/files-required-to-upload`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
  }),
});

export const {
  useUpdateRejectedDocumentsMutation,
  useGetRejectedDocumentsQuery,
  useUpdateInputsFieldsMutation,
} = verificationCenterApi;
