import { Body, Controller, Get, Param, Post, Put, Req, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';

@Controller("compta")
export class ComptaController extends BaseUtils {
  
  constructor(private readonly uberService: UberService) {
    super()
  }
  
  @Get(":refModel/:refId")
  async getPurchasesByIdRefModel(@Param() params:{refModel: string, refId: string}):Promise<unknown> {
    try {
        return await this.uberService.send('GET_COMPTAS', params)
    } catch (error) {
        this._catchEx(error)
    } 
  }

  @Post()
  async createCompta(@Body() body:any, @Req() req:any):Promise<unknown> {
    try {
        body.owner = +req.user.userId
        console.log(body)
        return await this.uberService.send('POST_COMPTA', body)
    } catch (error) {
        this._catchEx(error)
    }
  }

  @Put(":id")
  async updateCompta(@Param('id') id:string, @Body() body:any):Promise<unknown> {
    try {
        const result = await this.uberService.send('PUT_COMPTA', {id, body})
        return result;
    } catch (error) {
      throw error
    }
  }

  @Delete(":id")
  async deleteCompta(@Param('id') _id:string):Promise<unknown> {
    try {
        return await this.uberService.send('DELETE_COMPTA', _id)  
    } catch (error) {
        this._catchEx(error)
    }
  }
}
