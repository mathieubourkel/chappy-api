import { Body, Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseUtils } from 'libs/base/base.utils';
import { LogService } from './log.service';

@Controller("log")
export class LogController extends BaseUtils {
  constructor(private readonly logService: LogService) {
    super()
  }
  
  @Get(":refModel/:refId")
  async getLogsByIdRefModel(@Param() params:{refModel: string, refId: string}):Promise<unknown> {
      try {
          return await this.logService.getLogs(params);
      } catch (error) {
          this._catchEx(error)
      }
  }

  @Put(":id")
  async modifyStatusLog(@Param('id') id:string, @Body() body:any):Promise<unknown> {
      try {
          return await this.logService.modify(id, body);
      } catch (error) {
          this._catchEx(error)
      }
  }

  @Delete(":id")
  async delete(@Param() id:string):Promise<unknown> {
    try {
        return await this.logService.delete(id);  
    } catch (error) {
        this._catchEx(error)
    }
  }

  @Delete("clean")
  async deleteManyLogs(@Body() body:any):Promise<unknown> {
    try {
        return await this.logService.deleteMany(body);  
    } catch (error) {
        this._catchEx(error)
    }
  }
}
