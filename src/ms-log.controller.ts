import { Body, Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { BaseUtils } from 'libs/base/base.utils';

@Controller("log")
export class msLogController extends BaseUtils {
  constructor(private readonly appService: AppService) {
    super()
  }
  
  @Get(":refModel/:refId")
    getLogsByIdRefModel<T>(@Param() params:{refModel: string, refId: string}):Observable<T> {
        try {
            return this.appService.client.send('GET_LOGS', params);
        } catch (error) {
            console.log("error")
            this._catchEx(error)
        }
        
  }

  @Put(":id")
  async modifyStatusLog<T>(@Param('id') id:string, @Body() body:any) {
      try {
          return this.appService.client.send('MODIFY_STATUS_LOG', {id, body});
      } catch (error) {
          console.log("bb", error)
          this._catchEx(error)
      }
      
}
@Delete("clean")
deleteManyLogs(@Body() body:any): Observable<{}> {
  try {
      return this.appService.client.send('DELETE_MANY_LOGS', body);  
  } catch (error) {
      this._catchEx(error)
  }
  
}

@Delete(":id")
delete(@Param() id:string): Observable<{}> {
  try {
      return this.appService.client.send('DELETE_LOG', id);  
  } catch (error) {
      this._catchEx(error)
  }
  
}
}
