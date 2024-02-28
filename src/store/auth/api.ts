import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import {
  RegisterResponse,
  ForgotPayload,
  IResponse,
  LoginPayload,
  RegisterPayload,
  ResendEmailPayload,
  ResetPayload,
  VerifyEmailPayload,
} from "./interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/users/` }),
  endpoints: (builder) => ({
    login: builder.mutation<RegisterResponse, LoginPayload>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
    forgot: builder.mutation<IResponse, ForgotPayload>({
      query: (payload) => ({
        url: `forgot-password/${payload.email}`,
        method: "POST",
        body: payload,
      }),
    }),
    reset: builder.mutation<IResponse, ResetPayload>({
      query: ({ newPassword, oobCode, email }) => ({
        url: `reset-password/${email}`,
        method: "POST",
        body: { newPassword, oobCode },
      }),
    }),
    sendVerificationEmail: builder.mutation<IResponse, ResendEmailPayload>({
      query: (payload) => ({
        url: "email-verification",
        method: "POST",
        body: payload,
      }),
    }),
    resendVerificationEmail: builder.mutation<IResponse, ResendEmailPayload>({
      query: (payload) => ({
        url: `resend-verification-link/${payload.email}`,
        method: "POST",
        body: payload,
      }),
    }),
    verifyEmailAddress: builder.mutation<IResponse, VerifyEmailPayload>({
      query: (payload) => ({
        url: `verify-email/${payload.email}?code=${payload.code}`,
        method: "POST",
        body: payload,
      }),
    }),
    refreshToken: builder.mutation<IResponse, void>({
      query: (credentials) => ({
        url: "token/refresh",
        method: "GET",
        body: credentials,
      }),
    }),
    logOut: builder.mutation<IResponse, void>({
      query: (credentials) => ({
        url: "token/destroy",
        method: "GET",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotMutation,
  useResetMutation,
  useSendVerificationEmailMutation,
  useResendVerificationEmailMutation,
  useVerifyEmailAddressMutation,
  useLogOutMutation,
} = authApi;
