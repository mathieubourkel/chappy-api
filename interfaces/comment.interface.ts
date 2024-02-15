import { RefCommentEnum } from '../enums/refComment.enum';
import { StatusCommentEnum } from '../enums/statusComment.enum';

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