import { IResponse } from "store/auth";

export interface FetchNotificationsResponse extends IResponse {
  data: {
    next_page: null | string | number;
    current_page: number;
    last_page: number;
    current_pagesize: number;
    total: number;
    data: {
      uuid: string;
      content: string;
      status: boolean;
      created_at: string;
      updated_at: string;
    }[];
  };
}

export interface GetBadgeAlertResponse extends IResponse {
  data: {
    badge_alert: boolean;
  };
}

export interface GetBadgeAlertPayload {
  badge: string;
}
