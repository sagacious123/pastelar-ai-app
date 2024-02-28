import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utilities/axiosQuery/axiosBaseQuery";
import { baseUrl } from "../../utilities/requests";
import { IResponse } from "../auth/interface";
import {
  FetchTransactionsInfoResponse,
  FetchWalletInfoResponse,
  WithdrawalRequestPayload,
} from "./interface";
import { PaginatedPayload } from "store/interface";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/` }),
  //   tagTypes: ["Wallet"],
  endpoints: (builder) => ({
    fetchWalletBalance: builder.query<FetchWalletInfoResponse, string | void>({
      query: (payload) => ({
        url: "wallet",
        method: "GET",
        body: payload,
      }),
      //   providesTags: ["Wallet"],
    }),
    fetchTransactionHistory: builder.query<
      FetchTransactionsInfoResponse,
      PaginatedPayload
    >({
      query: (payload) => ({
        url: "transactions",
        method: "GET",
        body: payload,
      }),
      //   providesTags: ["Wallet"],
    }),
    withdrawalRequest: builder.mutation<IResponse, WithdrawalRequestPayload>({
      query: (credentials) => ({
        url: "wallet/withdrawal",
        method: "POST",
        body: credentials,
      }),
    }),
    authorizePayment: builder.mutation<IResponse, { escrow: string }>({
      query: (payload) => ({
        url: `escrow/${payload.escrow}/authorize`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useWithdrawalRequestMutation,
  useFetchWalletBalanceQuery,
  useFetchTransactionHistoryQuery,
  useAuthorizePaymentMutation,
} = walletApi;
