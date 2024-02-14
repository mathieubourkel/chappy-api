import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { BaseUtils } from 'libs/base/base.utils';
import { ModelEnum } from 'enums/model.enum';

@Controller("compta")
export class msComptaController extends BaseUtils {
  constructor(private readonly appService: AppService) {
    super()
  }
  
  @Get(":refModel/:refId")
    async getPurchasesByIdRefModel<T>(@Param() params:{refModel: string, refId: string}):Promise<T> {
        try {
            return await this.appService.getComptas(params)
        } catch (error) {
            console.log("error")
            this._catchEx(error)
        }
        
  }

  @Post()
    createCompta<T>(@Body() body:any):Observable<T> {
        try {
            return this.appService.client.send('POST_COMPTA', body);
        } catch (error) {
            console.log("coucou", error)
            this._catchEx(error)
        }
        
  }

  @Put(":id")
    async updateCompta<T>(@Param('id') id:string, @Body() body:any) {
        try {
            return await this.appService.client.send('PUT_COMPTA', {id, body});
        } catch (error) {
            console.log("bb", error)
            this._catchEx(error)
        }
        
  }

  @Delete(":id")
  deleteCompta(@Param() id:string): Observable<{}> {
    try {
        return this.appService.client.send('DELETE_COMPTA', id);  
    } catch (error) {
        this._catchEx(error)
    }
    
}

}
