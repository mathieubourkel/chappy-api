import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';
import { CommentInterface, UpdateCommentInterface, } from '../../interfaces/comment.interface';
import { RefEnumKeys } from '../../type/refEnumKeys.comment.type';

@Controller()
export class CommentController extends BaseUtils {
  constructor(private readonly uberService: UberService) {
    super()
  }

@Post('/comment')
async createComment(@Request() req: Request, @Body() body:CommentInterface):Promise<unknown> {
  try {
    body.author = req.user.userId
    return await this.uberService.send('POST_COMMENT', body)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/comment/:id')
async getCommentById(@Param('id') id: string):Promise<unknown> {
  try {
    return await this.uberService.send('GET_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/comments/:refKey/:refId')
async getCommentByIdRefModel(@Param() params:{refKey: RefEnumKeys, refId: string}):Promise<unknown> {
  try {
    return await this.uberService.send('GET_COMMENT_BY_REF', params)
  } catch (error) {
    this._catchEx(error)
  }
}

@Patch('/comment/:id')
async updateComment(@Param('id') id:string, @Body() body:UpdateCommentInterface):Promise<unknown> {
  try {
    console.log(id, body)
    return await this.uberService.send('PATCH_COMMENT', {id, body})
  } catch (error) {
    this._catchEx(error)
  }
}

@Delete('/comment/:id')
async deleteComment(@Param('id') id:string):Promise<unknown> {
  try {
    return await this.uberService.send('DELETE_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

}
