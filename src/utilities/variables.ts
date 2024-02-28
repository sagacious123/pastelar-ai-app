export const variables = {
  defaultSubDomain: process.env.REACT_APP_DEFAULT_SUBDOMAIN,
  registerUrl: `${process.env.REACT_APP_BASE_URL}/register`,
  invalidSubDomains: ["www"],
  nonSubDomainRoutes: ["/register"],
};
