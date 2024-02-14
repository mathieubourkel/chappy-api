import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseUtils } from 'libs/base/base.utils';

@Controller("auth")
export class msAuthController extends BaseUtils{
  constructor(private readonly appService: AppService) {
    super()
  }
  
  @Post('login')
  async login(@Body() body: any) {
    try {
      return this.appService.client.send('LOGIN', body);
  } catch (error) {
      this._catchEx(error)
  }
}

@Post('register')
  async register(@Body() body: any) {
    try {
      return this.appService.client.send('REGISTER', body);
  } catch (error) {
      this._catchEx(error)
  }
}

@Get('refreshToken')
  async refreshToken(@Req() req: any, @Res() res:any) {
    try {
      return this.appService.client.send('REFRESH_TOKEN', {req, res});
  } catch (error) {
      this._catchEx(error)
  }
}

@Put('resetPwd')
  async resetPwd(@Body() body: any) {
    try {
      return this.appService.client.send('RESET_PWD', body);
  } catch (error) {
      this._catchEx(error)
  }
}

}
