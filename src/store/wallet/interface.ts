import { IResponse } from "store/auth";
import { PaginatedPayload } from "store/interface";

export interface WithdrawalRequestPayload {
  amount: number;
  bank_id: string;
}

export interface Transaction {
  uuid: string;
  type: string;
  category: string;
  product: string;
  amount: number;
  balance: null;
  extra: null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FetchWalletInfoResponse extends IResponse {
  total_balance: number;
  avail_balance: number;
  escrow: number;
}

export interface FetchTransactionsInfoResponse extends IResponse {
  data: {
    next_page: any;
    current_page: number;
    last_page: number;
    current_pagesize: number;
    total: number;
    data: Transaction[];
  };
}

// export interface FetchTransactionsPayload extends PaginatedPayload {
//   creator?: boolean
// }
