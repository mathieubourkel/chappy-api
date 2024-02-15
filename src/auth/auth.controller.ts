import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';

@Controller()
export class AuthController extends BaseUtils {

  constructor(private readonly uberService: UberService) {
    super()
  }
  
  @Post('auth/login')
  async login(@Body() body: any) {
    try {
      return await this.uberService.send('LOGIN', body)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/register')
  async register(@Body() body: any) {
    try {
      return await this.uberService.send('REGISTER', body)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('auth/refreshToken')
  async refreshToken(@Req() req: any, @Res() res:any) {
    try {
      return await this.uberService.send('REFRESH_TOKEN', {req, res})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('auth/resetPwd')
  async resetPwd(@Body() body: any) {
    try {
      return await this.uberService.send('RESET_PWD', body)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('user/all')
  async getAllUsers() {
    try {
      return await this.uberService.send('ALL_USERS', {})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('user')
    async getInfosUser(@Req() req:any) {
      try {
        return await this.uberService.send('INFOS_USER', +req.user.userId)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('user')
    async modifyUser(@Body() body: any, @Req() req:any) {
      try {
        return await this.uberService.send('MODIFY_USER', {body, userId: +req.user.userId})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('user')
    async deleteUser(@Req() req:any) {
      try {
        return await this.uberService.send('DELETE_USER', +req.user.userId)
    } catch (error) {
      this._catchEx(error)
    }
  }
}
