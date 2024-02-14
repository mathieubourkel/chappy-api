import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseUtils } from 'libs/base/base.utils';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LogService extends BaseUtils {

  constructor(@Inject('UBER') private client: ClientProxy) {
    super()
  }

  async getLogs(params:any) {
    try {
        return await firstValueFrom(this.client.send('GET_LOGS', params));
    } catch (error) {
        this._catchEx(error)
    }
  }

  async modify(id:string, body:any) {
      try {
          return await firstValueFrom(this.client.send('MODIFY_STATUS_LOG', {id, body}));
      } catch (error) {
          this._catchEx(error)
      }
  }

  async delete(id:string) {
    try {
        return await firstValueFrom(this.client.send('DELETE_LOG', id));
    } catch (error) {
        this._catchEx(error)
    }
  }

  async deleteMany(body:any) {
    try {
        return await firstValueFrom(this.client.send('DELETE_MANY_LOGS', body));
    } catch (error) {
        this._catchEx(error)
    }
  }

}
