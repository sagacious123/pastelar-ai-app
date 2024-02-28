import { IResponse, User } from "store/auth";

export interface CreateCampaignPayload {
  title: string;
  description: string;
  exportingCountry: string;
  fundingGoal?: string;
  minimumAmount?: string;
  interestRate?: number;
  reward?: string;
  campaignEndDate?: string;
}

export interface SubmitCampaignPayload {
  campaignId: string;
}

export interface SubmitCampaign {
  data: {
    _id: string;
    title: string;
    description: string;
    exportingCountry: string;
    images: [];
    hasBeenReviewed: boolean;
    exporterId: string;
    backers: [];
    status: string;
    amountRaised: {
      $numberDecimal: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: 1;
    purchaseOrder: string;
    proformaInvoice: string;
    letterOfCredit: string;
    campaignEndDate: string;
    fundingGoal: {
      $numberDecimal: string;
    };
    interestRate: number;
    minimumAmount: null;
    reward: string;
    fundingGoalString: string;
    amountRaisedString: string;
    noOfBackersString: number;
    id: string;
  };
}

export interface DeleteCampaignPayload {
  campaignId: string;
}

export interface DeleteCampaignResponse extends IResponse {
  data: {};
}

export interface UpdateCampaignPayload {
  data: {
    title?: string;
    description?: string;
    exportingCountry?: string;
    fundingGoal?: string;
    minimumAmount?: string | null;
    interestRate?: number;
    reward?: string;
    campaignEndDate?: string;
  };
  id: string;
}

export interface CampaignData {
  _id: string;
  title: string;
  createdAt?: string;
  description: string;
  exportingCountry: string;
  images: string[];
  interestRate: number;
  reward: string;
  campaignEndDate: string;
  hasBeenReviewed: boolean;
  formQ?: string;
  purchaseOrder?: string;
  proformaInvoice?: string;
  letterOfCredit?: string;
  status?: string;
  exporter: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  minimumAmountString?: string;
  amountRaisedString?: string;
  fundingGoalString?: string;
  minimumAmount?: any;
  amountRaised?: any;
  fundingGoal?: any;
  noOfBackers?: number;
  riskReport?: string;
}

export interface SingleCampaignResponse extends IResponse {
  data: CampaignData;
}

export type AllCampaignsResponse = CampaignData[];

export interface DocumentUploadPayload {
  fileClass: string;
  campaignId: string;
  file: FormData;
}

export interface CampaignFilesUploadPayload {
  fileClass: string;
  campaignId: string;
  files: FormData;
}

export interface SearchCampaignsQueryPayload {
  skip?: any;
  limit?: any;
  sort?: string;
  exporterId?: string;
  status?: string;
  hasBeenReviewed?: string;
}

export interface BackCampaignPayload {
  campaignId: string;
  amount: string;
}

export interface BackCampaignResponse {
  amount: string;
  campaignId: string | undefined;
}

export interface ExporterDashboardStats {
  totalCampaigns: number;
  pendingCampaigns: number;
  completedCampaigns: number;
  totalAmountRaised: any;
}

interface BackerDashboardStats {
  fundsContributed: number;
  numberOfCampaignsSupported: number;
  numberOfExportersSupported: number;
  totalReturns: any;
}

export interface GetExporterStatsResponse {
  data: ExporterDashboardStats[];
}

export interface GetBackerStatsResponse {
  data: BackerDashboardStats;
}

export interface ExporterProfileStats {
  _id: string;
  exporterImage: string;
  totalBackers: number;
  totalCampaigns: number;
  exportingCountries: string[];
  activeCampaigns: number;
  exporterFullName: string;
  badge: string;
}

export interface GetExporterProfileStatsResponse {
  data: ExporterProfileStats;
}
