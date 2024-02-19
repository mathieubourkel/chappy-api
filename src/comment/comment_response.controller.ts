import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';
import {
  CommentInterface,
  ResponseCommentInterface,
  UpdateCommentInterface,
  UpdateResponseCommentInterface,
} from '../../interfaces/comment.interface';
import { RefEnumKeys } from '../../type/refEnumKeys.comment.type';

@Controller()
export class CommentResponseController extends BaseUtils {
  constructor(private readonly uberService: UberService) {
    super()
  }

@Post('/response')
async createResponseComment(@Body() body:ResponseCommentInterface):Promise<unknown> {
  try {
    return await this.uberService.send('POST_RESPONSE_COMMENT', body)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/response/:id')
async getResponseCommentById(@Param() id: string):Promise<unknown> {
  try {
    return await this.uberService.send('GET_RESPONSE_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/comment/response/:idComment')
async getResponseCommentByIdComment(@Param() idComment: string):Promise<unknown> {
  try {
    return await this.uberService.send('GET_RESPONSE_COMMENT_OF_COMMENT', idComment)
  } catch (error) {
    this._catchEx(error)
  }
}

@Patch('/response/:id')
async updateResponseComment(@Param('id') id:string, @Body() body:UpdateResponseCommentInterface):Promise<unknown> {
  try {
    console.log(id, body)
    return await this.uberService.send('PATCH_RESPONSE_COMMENT', {id, body})
  } catch (error) {
    this._catchEx(error)
  }
}

@Delete('/response/:id')
async deleteResponseComment(@Param('id') id:string):Promise<unknown> {
  try {
    return await this.uberService.send('DELETE_RESPONSE_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

}
