import { RouteDirector } from "./interface";

export const breadcrumbConfig: { [x: string]: RouteDirector[] } = {
  createCampaign: [
    { name: "Campaign", to: "/exporter/campaign" },
    { name: "Create Campaign" },
  ],
  exporterChangePassword: [
    { name: "Security", to: "/exporter/settings" },
    { name: "Change Password" },
  ],
  backersChangePassword: [
    { name: "Security", to: "/backer/settings" },
    { name: "Change Password" },
  ],
  backerFundWallet: [
    { name: "Wallet", to: "/backer/wallet" },
    { name: "Fund Wallet" },
  ],
  exporterAddPaymentInfo: [
    { name: "Transactions", to: "/exporter/transactions" },
    { name: "Add Payment Information" },
  ],
  viewCampaigns: [
    { name: "Campaign", to: "/exporter/campaign" },
    { name: "View Campaign" },
  ],
  discoverCampaigns: [
    { name: "Discover Campaigns", to: "/backer/discover" },
    { name: "View Campaign" },
  ],
  exporterUpdatePaymentInfo: [
    { name: "Transactions", to: "/exporter/transactions" },
    { name: "Update Payment Information" },
  ],
};

export type BreadcrumbConfigKeys = keyof typeof breadcrumbConfig;
