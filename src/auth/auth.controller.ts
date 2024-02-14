import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { BaseUtils } from 'libs/base/base.utils';
import { AuthService } from './auth.service';

@Controller()
export class AuthController extends BaseUtils {

  constructor(private readonly authService: AuthService) {
    super()
  }
  
  @Post('auth/login')
  async login(@Body() body: any) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/register')
  async register(@Body() body: any) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('auth/refreshToken')
  async refreshToken(@Req() req: any, @Res() res:any) {
    try {
      return this.authService.refreshToken(req, res);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('auth/resetPwd')
  async resetPwd(@Body() body: any) {
    try {
      return this.authService.resetPwd(body);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('user/all')
  async getAllUsers() {
    try {
      return this.authService.getAllUsers();
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('user')
    async getInfosUser(@Req() req:any) {
      try {
        return await this.authService.getInfoUser(+req.user.userId);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('user')
    async modifyUser(@Body() body: any, @Req() req:any) {
      try {
        return await this.authService.modifyUser(body, +req.user.userId);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('user')
    async deleteUser(@Req() req:any) {
      try {
        return this.authService.deleteUser(+req.user.userId);
    } catch (error) {
      this._catchEx(error)
    }
  }
}
