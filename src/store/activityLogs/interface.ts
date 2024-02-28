export interface GetActivityLogsPayload {
  skip?: number;
  limit?: number;
  sort?: string;
  isRead?: boolean;
}

export interface UpdateActivityLog {
  activityId: string;
}
