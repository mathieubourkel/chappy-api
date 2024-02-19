import { Body, Controller, Get, Param, Put, Delete, Req } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';

@Controller("log")
export class LogController extends BaseUtils {
  constructor(private readonly uberService: UberService) {
    super()
  }
  
  @Get(":refModel/:refId")
  async getLogsByIdRefModel(@Param() params:{refModel: string, refId: string}):Promise<unknown> {
      try {
          return await this.uberService.send('GET_LOGS', params)
      } catch (error) {
          this._catchEx(error)
      }
  }

  @Get("notifs")
  async getNotifsByUser(@Req() req:any):Promise<unknown> {
      try {
          return await this.uberService.send('GET_LOGS', {refModel: "notifs", refId: req.user.userId})
      } catch (error) {
          this._catchEx(error)
      }
  }

  @Put(":id")
  async modifyStatusLog(@Param('id') id:string, @Body() body:any):Promise<unknown> {
      try {
        return await this.uberService.send('MODIFY_STATUS_LOG', {id, body})
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
  async deleteManyLogs(@Body() body:any):Promise<unknown> {
    try {
        return await this.uberService.send('DELETE_MANY_LOGS', body) 
    } catch (error) {
        this._catchEx(error)
    }
  }
}
