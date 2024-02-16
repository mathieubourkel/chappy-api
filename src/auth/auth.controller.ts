import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';
import { resourceLimits } from 'worker_threads';

@Controller()
export class AuthController extends BaseUtils {

  constructor(private readonly uberService: UberService) {
    super()
  }
  
  @Post('auth/login')
  async login(@Body() body: any, @Res() res:any) {
    try {
      const result:any = await this.uberService.send('LOGIN', body)
      if (!result) this._Ex("Failed to LOGIN", 401, "FAILED", "a")
      res.cookie("refreshToken", result.refreshToken, result.cookieOptions)
      return result;
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
      const result:any = await this.uberService.send('REFRESH_TOKEN', req)
      if (!result) this._Ex("Failed to REFRESH", 401, "FAILED", "a")
      res.cookie("refreshToken", result.refreshToken, result.cookieOptions)
      return result;
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

  @Delete('user/my-account')
    async deleteMyAccount(@Req() req:any) {
      try {
        return await this.uberService.send('DELETE_USER', +req.user.userId)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Delete('user/:id')
    async deleteRandomUser(@Param() id:string, @Req() req:any) {
      try {
        if (+req.user.userId !== 29387387) this._Ex("NO ADMIN", 403, "NOADM", "NOADM")
        return await this.uberService.send('DELETE_USER', +id)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('user/all')
  async getAllGroups() {
    try {
      return await this.uberService.send('ALL_GROUPS', {})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('group/:id')
    async modifyGroup(@Body() body: any, @Param() id:string) {
      try {
        return await this.uberService.send('MODIFY_GROUP', {body, userId: +id})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('group/demand/add')
    async addGroupDemand(@Body() body:any) {
      try {
        return await this.uberService.send('ADD_GROUP_DEMAND', body)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('group/demand/change-status/:id')
    async changeStatus(@Body() body:any, @Param() id:string, @Req() req:any) {
      try {
        return await this.uberService.send('MODIFY_GROUP_DEMAND', {body, id:+id, userId: +req.user.userId})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Delete('group/:id')
    async deleteGroup(@Param() id:string, @Req() req:any) {
      try {
        return await this.uberService.send('DELETE_GROUP', {groupId:+id, userId: +req.user.userId})
    } catch (error) {
      this._catchEx(error)
    }
  }
}
