export interface UpdateVerificationDocumentPayload {
  files: File;
  fileClass: string;
  uploadQuery: string;
  fileId: string;
}
export interface UpdateInputsPayload {
  uploadQuery: string;
  fileId: string;
  payload: {
    inputFieldName: string;
    updatedInput: string;
  };
}

export interface UpdateVerificationDocumentResponse {
  data: {
    _id: string;
    userId: string;
    adminApprovalStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    uploadedDocumentDetails: [
      {
        documentFileClass: string;
        documentUrl: string;
      }
    ];
  };
}

interface VerificationData {
  dataRequestChange: {
    dataRequestDocument: {
      _id: string;
      userId: string;
      adminApprovalStatus: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    documentsToUpload: string[];
  };
  userProfileReapproval: {
    _id: string;
    reason: string[];
    userId: string;
    adminId: string;
    resolved: false;
    documentsToUpload: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  campaignReapproval: {
    _id: string;
    reason: string[];
    campaignId: string;
    adminId: string;
    exporterId: string;
    resolved: boolean;
    documentsToUpload: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
}

export interface VerificationDataResponse {
  data: VerificationData;
}
