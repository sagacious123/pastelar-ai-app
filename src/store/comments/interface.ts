import { IResponse } from "store/auth";

export interface CreateCommentPayload {
  campaignId: string;
  text: string;
}

export interface CreateReplyPayload {
  commentId: string;
  text: string;
}

export interface AddComment {
  data: {
    text: string;
    author: string;
    campaignId: string;
    moderated: boolean;
    moderationComment: boolean | null;
    isDeleted: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    likeCount: number;
  };
}

export interface AddReply {
  data: {
    text: string;
    author: string;
    campaignId: string;
    parentId: string;
    moderated: boolean;
    moderationComment: boolean | null;
    isDeleted: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    likeCount: number;
  };
}

export interface GetSingleCommentQueryPayload {
  commentId?: string;
}
export interface GetAllCommentQueryPayload {
  campaignId?: string;
}

export interface CommentsData {
  _id: string;
  text: string;
  campaignId: string;
  parentId: string;
  moderated: false;
  moderationComment: null;
  isDeleted: false;
  authorDetails: {
    firstName: string;
    lastName: string;
    image: string;
  };
  likeCount: number;
  replies: [
    {
      _id: string;
      text: string;
      authorDetails: {
        firstName: string;
        lastName: string;
        image: string;
      };
      likeCount: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

export interface SingleCommentResponse extends IResponse {
  data: CommentsData;
}

export interface AllCommentsResponse {
  data: CommentsData[];
}
export interface LikeCommentPayload {
  commentId?: string;
}

export interface LikeComment {
  commentId?: string;
  userId?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
