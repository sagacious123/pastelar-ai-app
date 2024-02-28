export interface CampaignUpdateData {
  id: string;
  authorDetails: string;
  campaignId: string;
  createdAt: Date;
  likeCount: number | string;
  post: string;
  updatedAt: Date;
}

export interface GetCampaignUpdatesResponse {
  data?: Partial<CampaignUpdateData[]>;
}

export interface AddCampaignUpdate {
  post: string;
}

export interface AddCampaignResponse {
  campaignId: string;
  post: string;
  author: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  likeCount: number | string;
}

export interface CampaignUploadFilesPayload {
  files: File;
  fileClass: string;
  postUpdateId: string;
}

export interface CampaignUploadFilesResponse {
  formQ: string | undefined;
  billOfLaden: string | undefined;
  campaignId: string;
  id: string;
}
