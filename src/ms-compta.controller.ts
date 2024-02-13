import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller("compta")
export class msComptaController {
  constructor(private readonly appService: AppService) {}
  
  @Get(":refModel/:refId")
    getPurchasesByIdRefModel<T>(@Param() params:{refModel: string, refId: string}):Observable<T> {
        return this.appService.client.send('GET_COMPTAS', params);
  }

  @Post()
    createCompta<T>(@Body() body:any): Observable<T> {
        return this.appService.client.send('POST_COMPTA', body);
  }

  @Put(":id")
    updateCompta<T>(@Param('id') id:string, @Body() body:any): Observable<T> {
        return this.appService.client.send('PUT_COMPTA', {id, body});
  }

  @Delete(":id")
  deleteCompta(@Param() id:string): Observable<{}> {
    return this.appService.client.send('DELETE_COMPTA', id);
}

}
