export interface IResponse {
  error: boolean;
  errorCode: number;
  message: string;
  data: null | any;
}

export interface User {
  id: string;
  firstName: string;
  _id: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  avatar: string;
  image: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  sex: string;
  dateOfBirth: string;
  age: string;
  role: string;
  isDeleted: boolean;
  active: boolean;
  referredByCode: string;
  personalReferralCode: string;
  userDataUsageConsent: boolean;
  signature: string;
  profileCompleted: {
    completionRate: number;
    isCompleted: boolean;
    fieldsNotCompleted: string[];
  };
  businessInformation: {
    exportGoodType: string;
    TIN: string;
    yearsInExport: string;
    exportFrequency: string;
    countriesOfExport: string[];
    exportRegCertificateUrl: string;
    businessName?: string;
    CACRegNo?: string;
  };
  userIdentity: {
    identificationMode: string;
    identificationUrl: string;
    utilityBillUrl: string;
    bvn: string;
  };
}

export interface RegisterResponse extends IResponse {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isDeleted: boolean;
    active: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// export interface UserWithAuth extends User {
//   authorization: {
//     type: string;
//     access_token?: string | null;
//     expires_in: number;
//   };
// }

export interface Auth {
  user?: User | null;
  token_type: string;
  access_token?: string | null;
  isLoading?: boolean;
  expires_in: number;
}

export interface LoginPayload {
  email: string;
  password: string;
  // rememberMe?: boolean;
}

// export interface AuthResponse extends IResponse {
//   data: RegisterResponse;
// }

export interface ForgotPayload {
  email: string;
}

export interface ResetPayload {
  oobCode: string;
  newPassword: string;
  email: string;
}
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // confirmPassword: string;
  role: string;
}

export interface VerifyEmailPayload {
  code: string;
  email: string;
}

export interface ResendEmailPayload {
  email: string;
}

export interface CheckpointQueryPayload {
  query: string;
}
