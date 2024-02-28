export interface updateNotificationSettingsPayload {
  campaignUpdates?: boolean;
  commentsOnCampaigns?: boolean;
  systemAlerts?: boolean;
  importantAnnouncements?: boolean;
  inApp?: boolean;
  email?: boolean;
}

interface NotificationSettingsData {
  _id: string;
  userId: string;
  campaignUpdates: boolean;
  commentsOnCampaigns: boolean;
  email: boolean;
  importantAnnouncements: boolean;
  inApp: boolean;
  systemAlerts: boolean;
  id: string;
}

export interface updateNotificationSettingsResponse {
  data: NotificationSettingsData;
}
