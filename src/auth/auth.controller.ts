import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';
import { ProjectService } from "../project/project.service"
import { cookieOptions } from 'utils/cookies.options.utils';

@Controller()
export class AuthController extends BaseUtils {

  constructor(private readonly uberService: UberService,
    private readonly projectService: ProjectService) {
    super()
  }
  
  @Post('auth/login')
  async login(@Body() body: any, @Res() res:any) {
    try {
      const result:any = await this.uberService.send('LOGIN', body)
      if (!result) this._Ex("Failed to LOGIN", 401, "FAILED", "a")
      res.cookie("refreshToken", result.refreshToken, cookieOptions)
      res.status(200).json(result)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/register')
  async register(@Body() body: any) {
    try {
      const result:any = await this.uberService.send('REGISTER', body)
      await this.uberService.emit('SEND_MAIL_CONFIRM_ACCOUNT', {emailAddress: result.email, confirmUrl: `${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}/auth/validateAccount/${result.validationToken}`})
      return result;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('auth/validateAccount/:validateToken')
  async validateAccount(@Req() req:any, @Res() res:any) {
    try {
      const user:any = await this.uberService.send('GET_ONE_LIGHT_USER', {id: +req.user.userId})
      const validate = await this.uberService.send('VALIDATE_USER', user)
      if (!validate) this._Ex("FAILED TO VALIDATE", 401, "/validateToken", "")
      res.redirect(`${process.env.VITE_PROTOCOL}://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('auth/refreshToken')
  async refreshToken(@Req() req: any, @Res() res:any) {
    try {
      const result:any = await this.uberService.send('REFRESH_TOKEN', {userId:+req.user.userId, refreshToken: req.cookies.refreshToken})
      if (!result) this._Ex("Failed to REFRESH", 401, "FAILED", "a")
      res.cookie("refreshToken", result.refreshToken, cookieOptions)
      res.status(200).json(result)
      return result;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('auth/emailToken/:token')
  async getEmailToken(@Param('token') token:string) {
    try {
      return await this.uberService.send('GET_EMAIL_TOKEN', {emailToken: token})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/resetPwd/sendMail')
  async sendMailForResetPwd(@Body() body: any) {
    try {
      const result:any = await this.uberService.send('GET_USER_EMAIL_TOKEN', {email: body.email})
      await this.uberService.emit('SEND_MAIL_RESET_PWD', {emailAddress: result.user.email, confirmUrl: `${process.env.VITE_PROTOCOL}://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}/forgot-pwd/${result.emailToken}`})
      return "MAIL SENT"
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/resetPwd/withMail')
  async resetPwdWithMail(@Body() body: any, @Req() req: any) {
    try {
      const user:any = await this.uberService.send('GET_ONE_LIGHT_USER', {id: +req.user.userId})
      return await this.uberService.send('RESET_PWD_WITHOUT_CHECK', {newPwd: body.newPwd, user})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('user/resetPwd')
  async resetPwdWhenLogged(@Body() body: any, @Req() req:any) {
    try {
      const user:any = await this.uberService.send('GET_ONE_USER_FOR_PWD', {id: +req.user.userId})
      if (!user) this._Ex("FAILED TO RESET PWD", 400, "CTRL/RST/PWD", "")
      return await this.uberService.send('RESET_PWD', {oldPwd: body.oldPassword, newPwd: body.newPassword, user})
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
        const infosUser:any = await this.uberService.send('INFOS_USER', +req.user.userId)
        const infosProject = await this.projectService.getProjectsByUser(req.user.userId);
        infosUser.projects = infosProject
        infosUser.participations = []
        infosUser.myOwnTasks = []
        return infosUser
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

  @Get('group/all')
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
