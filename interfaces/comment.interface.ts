import { RefCommentEnum } from '../enums/refComment.enum';
import { StatusCommentEnum } from '../enums/statusComment.enum';
import { Types } from 'mongoose';

export interface CommentInterface {
  ref: RefCommentEnum
  refId: string;
  content: string;
  author: string;
  status: StatusCommentEnum;
  medias: string[];
}

export interface UpdateCommentInterface {
  content: string;
  status: StatusCommentEnum;
}

export interface ResponseCommentInterface {
  commentId: Types.ObjectId;
  content: string;
  author: string;
  status: StatusCommentEnum;
  medias: string[];
}

export interface UpdateResponseCommentInterface {
  content: string;
  status: StatusCommentEnum;
}