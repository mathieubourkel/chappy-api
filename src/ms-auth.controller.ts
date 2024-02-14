import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseUtils } from 'libs/base/base.utils';

@Controller()
export class msAuthController extends BaseUtils{
  constructor(private readonly appService: AppService) {
    super()
  }
  
  @Post('auth/login')
  async login(@Body() body: any) {
    try {
      return this.appService.client.send('LOGIN', body);
  } catch (error) {
      this._catchEx(error)
  }
}

@Post('auth/register')
  async register(@Body() body: any) {
    try {
      return this.appService.client.send('REGISTER', body);
  } catch (error) {
      this._catchEx(error)
  }
}

@Get('auth/refreshToken')
  async refreshToken(@Req() req: any, @Res() res:any) {
    try {
      return this.appService.client.send('REFRESH_TOKEN', {req, res});
  } catch (error) {
      this._catchEx(error)
  }
}

@Put('auth/resetPwd')
  async resetPwd(@Body() body: any) {
    try {
      return this.appService.client.send('RESET_PWD', body);
  } catch (error) {
      this._catchEx(error)
  }
}

@Get('user/all')
  async getAllUsers() {
    try {
      return this.appService.client.send('ALL_USERS', {});
  } catch (error) {
      this._catchEx(error)
  }
}

@Get('user')
  async getInfosUser(@Req() req:any) {
    try {
      return this.appService.client.send('INFOS_USER', req);
  } catch (error) {
      this._catchEx(error)
  }
}

@Put('user')
  async modifyUser(@Body() body: any, @Req() req:any) {
    try {
      return this.appService.client.send('MODIFY_USER', {body, req});
  } catch (error) {
      this._catchEx(error)
  }
}

@Put('user')
  async deleteUser(@Req() req:any) {
    try {
      return this.appService.client.send('DELETE_USER', req);
  } catch (error) {
      this._catchEx(error)
  }
}

}
