import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseUtils } from 'libs/base/base.utils';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService extends BaseUtils {

    constructor(@Inject('UBER') private client: ClientProxy) {
        super()
      }
      
    async login(body:any) {
        try {
            return await firstValueFrom(this.client.send('LOGIN', body));
        } catch (error) {
            this._catchEx(error)
        }
    }

    async register(body:any) {
        try {
            return await firstValueFrom(this.client.send('REGISTER', body));
        } catch (error) {
            this._catchEx(error)
        }
    }

    async refreshToken(req: any, res:any) {
        try {
            return await firstValueFrom(this.client.send('REFRESH_TOKEN', {req, res}));
        } catch (error) {
            this._catchEx(error)
        }
    }

    async resetPwd(body: any) {
        try {
            return await firstValueFrom(this.client.send('RESET_PWD', body));
        } catch (error) {
            this._catchEx(error)
        }
    }

    async getAllUsers() {
        try {
            return await firstValueFrom(this.client.send('ALL_USERS', {}));
        } catch (error) {
            this._catchEx(error)
        }
    }

    async getInfoUser() {
        try {
            return await firstValueFrom(this.client.send('ALL_USERS', {}));
        } catch (error) {
            this._catchEx(error)
        }
    }
}
