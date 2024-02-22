import { Body, Controller, Get, Param, Put, Delete, Req } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';
import { LogsModelEnum } from 'enums/logs.model.enum';
import { LogsStatusEnum } from 'enums/logs.status.enum';
import { Request } from 'express';

@Controller("log")
export class LogController extends BaseUtils {
  constructor(private readonly uberService: UberService) {
    super()
  }
  
  @Get(":refModel/:refId")
  async getLogsByIdRefModel(@Param() params:{refModel: string, refId: string}):Promise<unknown> {
      try {
          return await this.uberService.send('GET_LOGS_BY_MODEL', params)
      } catch (error) {
          this._catchEx(error)
      }
  }

  @Get("notifs")
  async getNotifsByUser(@Req() req:Request):Promise<unknown> {
      try {
          return await this.uberService.send('GET_LOGS_BY_MODEL_AND_STATUS', {refModel: LogsModelEnum.notifs, refId: +req.user.userId, status:LogsStatusEnum.NEW})
      } catch (error) {
          this._catchEx(error)
      }
  }

  @Get("notif/view/:id")
  async modifyStatusLog(@Param('id') _id:string):Promise<unknown> {
      try {
        return await this.uberService.send('MODIFY_STATUS_LOG', {_id, status: LogsStatusEnum.OLD})
      } catch (error) {
          this._catchEx(error)
      }
  }

  @Delete(":id")
  async delete(@Param() id:string):Promise<unknown> {
    try {
        return await this.uberService.send('DELETE_LOG', id) 
    } catch (error) {
        this._catchEx(error)
    }
  }

  @Delete("clean")
  async deleteManyLogs(@Body() body:{date:Date}):Promise<unknown> {
    try {
        return await this.uberService.send('DELETE_MANY_LOGS_BY_DATE', {date:body.date}) 
    } catch (error) {
        this._catchEx(error)
    }
  }
}
