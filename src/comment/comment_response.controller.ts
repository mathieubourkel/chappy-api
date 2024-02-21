import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
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
async createResponseComment(@Req() req: any, @Body() body:ResponseCommentInterface):Promise<unknown> {
  try {
    if (!req.user.userId) this._Ex("FORBIDDEN ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    body.author = { id : String(+req.user.userId), username : `${req.user.lastname} ${req.user.firstname}` }
    return await this.uberService.send('POST_RESPONSE_COMMENT', body)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/response/:id')
async getResponseCommentById(@Req() req: any, @Param() id: string):Promise<unknown> {
  try {
    if (!req.user.userId) this._Ex("FORBIDDEN-ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('GET_RESPONSE_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/comment/response/:idComment')
async getResponseCommentByIdComment(@Req() req: any, @Param() idComment: string):Promise<unknown> {
  try {
    if (!req.user.userId) this._Ex("FORBIDDEN-ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('GET_RESPONSE_OF_COMMENT', idComment)
  } catch (error) {
    this._catchEx(error)
  }
}

@Patch('/response/:id')
async updateResponseComment(@Param('id') id:string, @Req() req: any, @Body() body:UpdateResponseCommentInterface):Promise<unknown> {
  try {
    const response:any = await this.uberService.send('GET_RESPONSE_COMMENT', id)
    if (response.author.id !== req.user.userId.toString() || !req.user.userId ) this._Ex("FORBIDDEN ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('PATCH_RESPONSE_COMMENT', {id, body})
  } catch (error) {
    this._catchEx(error)
  }
}

@Delete('/response/:id')
async deleteResponseComment(@Req() req: any, @Param('id') id:string):Promise<unknown> {
  try {
    const response:any = await this.uberService.send('GET_RESPONSE_COMMENT', id)
    if (response.author.id !== req.user.userId.toString() || !req.user.userId ) this._Ex("FORBIDDEN ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('DELETE_RESPONSE_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

}
