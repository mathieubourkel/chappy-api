import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Req,
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
async createComment(@Req() req: any, @Body() body:CommentInterface):Promise<unknown> {
  try {
    console.log(req.user)
    if (!req.user.userId) this._Ex("FORBIDDEN-ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    body.author = { id : String(+req.user.userId), username : `${req.user.lastname} ${req.user.firstname}` }
    return await this.uberService.send('POST_COMMENT', body)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/comment/:id')
async getCommentById(@Req() req: any, @Param('id') id: string):Promise<unknown> {
  try {
    if (!req.user.userId) this._Ex("FORBIDDEN-ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('GET_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

@Get('/comments/:refKey/:refId')
async getCommentByIdRefModel(@Req() req: any, @Param() params:{refKey: RefEnumKeys, refId: string}):Promise<unknown> {
  try {
    if (!req.user.userId) this._Ex("FORBIDDEN-ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('GET_COMMENT_BY_REF', params)
  } catch (error) {
    this._catchEx(error)
  }
}

@Patch('/comment/:id')
async updateComment(@Param('id') id:string, @Req() req: any, @Body() body:UpdateCommentInterface):Promise<unknown> {
  try {
    const comment:any = await this.uberService.send('GET_COMMENT', id)
    if (comment.author.id !== req.user.userId.toString() || !req.user.userId ) this._Ex("FORBIDDEN ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('PATCH_COMMENT', {id, body})
  } catch (error) {
    this._catchEx(error)
  }
}

@Delete('/comment/:id')
async deleteComment(@Param('id') id:string, @Req() req: any ):Promise<unknown> {
  try {
    const comment:any = await this.uberService.send('GET_COMMENT', id)
    console.log(comment)
    if (comment.author.id !== req.user.userId.toString() || !req.user.userId ) this._Ex("FORBIDDEN ACCESS", 403, "FORBIDDEN-ACCESS", "/" )
    return await this.uberService.send('DELETE_COMMENT', id)
  } catch (error) {
    this._catchEx(error)
  }
}

}
