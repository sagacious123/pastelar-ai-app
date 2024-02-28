import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
// import { IResponse, User } from "../auth/interface";
import {
  AddComment,
  CreateCommentPayload,
  CreateReplyPayload,
  AddReply,
  AllCommentsResponse,
  SingleCommentResponse,
  LikeComment,
  LikeCommentPayload,
} from "./interface";
// import { convertObjectToURLParams } from "utilities";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/comments` }),
  endpoints: (builder) => ({
    getAllComments: builder.query<AllCommentsResponse, string | undefined>({
      query: (payload) => ({
        url: `/${payload}/comments-and-replies`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    getComment: builder.query<SingleCommentResponse, string | undefined>({
      query: (payload) => ({
        url: `/${payload}`,
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      }),
    }),
    addComment: builder.mutation<AddComment, CreateCommentPayload>({
      query: (payload) => ({
        url: `/${payload.campaignId}/add-comment`,
        method: "POST",
        body: payload,
      }),
    }),
    addReply: builder.mutation<AddReply, CreateReplyPayload>({
      query: (payload) => ({
        url: `/${payload.commentId}/reply-to-comment`,
        method: "POST",
        body: payload,
      }),
    }),
    likeComment: builder.mutation<LikeCommentPayload, LikeComment>({
      query: (payload) => ({
        url: `/${payload.commentId}/toggle-like-unlike`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetAllCommentsQuery,
  useAddCommentMutation,
  useAddReplyMutation,
  useLikeCommentMutation,
} = commentApi;
