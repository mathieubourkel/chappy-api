import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';
import { ProjectService } from "../project/project.service"
import { cookieOptions } from 'utils/cookies.options.utils';
import { Request, Response } from 'express';
import { DemandsStatusEnum } from 'enums/demands.status.enum';
import { intUser } from 'interfaces/user.interface';
import { intRegister } from 'interfaces/auth.interface';
import { intCompany } from 'interfaces/company.interface';

@Controller()
export class AuthController extends BaseUtils {

  constructor(private readonly uberService: UberService,
    private readonly projectService: ProjectService) {
    super()
  }
  
  @Post('auth/login')
  async login(@Body() body: {email:string, password:string}, @Res() res:Response):Promise<any> {
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
  async register(@Body() body: intUser):Promise<unknown> {
    try {
      const result:any = await this.uberService.send('REGISTER', body)
      await this.uberService.emit('SEND_MAIL_CONFIRM_ACCOUNT', {emailAddress: result.email, confirmUrl: `${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}/auth/validateAccount/${result.validationToken}`})
      return result;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/registerWithCompany')
  async registerWithCompany(@Body() body: intRegister):Promise<unknown> {
    try {
      const result:any = await this.uberService.send('REGISTER', body)
      await this.uberService.emit('SEND_MAIL_CONFIRM_ACCOUNT', {emailAddress: result.email, confirmUrl: `${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}/auth/validateAccount/${result.validationToken}`})
      body.owner = result;
      const resultCompany:any = await this.uberService.send("ADD_GROUP", body)
      return {result, resultCompany};
    } catch (error) {
      this._catchEx(error)
    }
  }


  @Get('auth/validateAccount/:validateToken')
  async validateAccount(@Req() req:Request, @Res() res:Response):Promise<any> {
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
  async refreshToken(@Req() req: Request, @Res() res:Response):Promise<any> {
    try {
      const result:any = await this.uberService.send('REFRESH_TOKEN', {userId:+req.user.userId, refreshToken: req.cookies.refreshToken})
      if (!result) this._Ex("Failed to REFRESH", 401, "FAILED", "a")
      res.cookie("refreshToken", result.refreshToken, cookieOptions)
      res.status(200).json(result)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('auth/emailToken/:token')
  async getEmailToken(@Param('token') token:string):Promise<unknown> {
    try {
      return await this.uberService.send('GET_EMAIL_TOKEN', {emailToken: token})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/resetPwd/sendMail')
  async sendMailForResetPwd(@Body() body: {email:string}):Promise<string> {
    try {
      const result:any = await this.uberService.send('CREATE_EMAIL_TOKEN', {email: body.email})
      await this.uberService.emit('SEND_MAIL_RESET_PWD', {emailAddress: body.email, confirmUrl: `${process.env.VITE_PROTOCOL}://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}/forgot-pwd/${result.emailToken}`})
      return "MAIL SENT"
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('auth/resetPwd/withMail')
  async resetPwdWithMail(@Body() body: {newPwd:string, emailToken:string}, @Req() req: Request):Promise<unknown> {
    try {
      const user:any = await this.uberService.send('GET_ONE_LIGHT_USER', {id: +req.user.userId})
      return await this.uberService.send('RESET_PWD_WITHOUT_CHECK', {newPwd: body.newPwd, user})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('user/resetPwd')
  async resetPwdWhenLogged(@Body() body: {newPwd:string, oldPwd:string}, @Req() req:Request):Promise<unknown> {
    try {
      const user:any = await this.uberService.send('GET_USER_WITH_PWD', {id: +req.user.userId})
      if (!user) this._Ex("FAILED TO RESET PWD", 400, "CTRL/RST/PWD", "")
      return await this.uberService.send('RESET_PWD', {oldPwd: body.oldPwd, newPwd: body.newPwd, user})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('user/all')
  async getAllUsers():Promise<unknown> {
    try {
      return await this.uberService.send('ALL_USERS', {})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('user')
    async getInfosUser(@Req() req:Request):Promise<unknown> {
      try {
        const infosUser:any = await this.uberService.send('GET_USER_BYID', +req.user.userId)
        const infosProject = await this.projectService.getProjectsByUser(req.user.userId);
        infosUser.projects = infosProject
        infosUser.participations = []
        infosUser.myOwnTasks = []
        return infosUser;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('user')
    async modifyUser(@Body() body: any, @Req() req:Request):Promise<unknown> {
      try {
        return await this.uberService.send('MODIFY_USER', {body, userId: +req.user.userId})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Delete('user/my-account')
    async deleteMyAccount(@Req() req:Request):Promise<unknown> {
      try {
        return await this.uberService.send('DELETE_USER', {id:+req.user.userId})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Delete('user/:id')
    async deleteRandomUser(@Param() id:string, @Req() req:Request):Promise<unknown> {
      try {
        if (+req.user.userId !== 29387387) this._Ex("NO ADMIN", 403, "NOADM", "NOADM")
        return await this.uberService.send('DELETE_USER', {id:+id})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('group/all')
  async getAllGroups():Promise<unknown> {
    try {
      return await this.uberService.send('ALL_GROUPS', {})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('group/:id')
    async modifyGroup(@Body() body: intCompany, @Param() id:string):Promise<unknown> {
      try {
        return await this.uberService.send('MODIFY_GROUP', {body, userId: +id})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Post('group')
    async addGroup(@Body() body: intCompany, @Req() req:Request):Promise<unknown> {
      try {
        const user:any = await this.uberService.send('GET_ONE_LIGHT_USER', {id: +req.user.userId})
        body.owner = user;
        return await this.uberService.send('ADD_GROUP', body)
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('group/demand/add/:idGroup')
    async addGroupDemand(@Req() req:Request):Promise<unknown> {
      try {
        return await this.uberService.send('CREATE_DEMAND', {idUser: +req.user.userId, idGroup: req.params.idGroup})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('group/demand/valid/:id')
    async validDemand(@Param('id') id:string, @Req() req:Request):Promise<unknown> {
      try {
        const demand:any = await this.uberService.send("GET_ONE_DEMAND", {idDemand:+id})
        const group:any = await this.uberService.send("GET_ONE_GROUP", {idGroup: demand.group.id})
        if (group.owner.id != req.user.userId) this._Ex("NO RIGHTS", 403, "DEMAND","")
        return await this.uberService.send('MODIFY_DEMAND', {demand: demand, status: DemandsStatusEnum.VALIDATE})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('group/demand/refuse/:id')
    async refuseDemand(@Param('id') id:string, @Req() req:Request):Promise<unknown> {
      try {
        const demand:any = await this.uberService.send("GET_ONE_DEMAND", {idDemand:+id})
        const group:any = await this.uberService.send("GET_ONE_GROUP", {idGroup: demand.group.id})
        if (group.owner.id != req.user.userId) this._Ex("NO RIGHTS", 403, "DEMAND","")
        return await this.uberService.send('DELETE_DEMAND', {idDemand: demand.id})
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('group/demand/quit/:id')
    async quitCompany(@Param('id') id:string, @Req() req:Request):Promise<unknown> {
      try {
        const demand:any = await this.uberService.send("GET_ONE_DEMAND", {idDemand:+id})
        if (demand.user.id != req.user.userId) this._Ex("NO RIGHTS", 403, "DEMAND","")
        return await this.uberService.send('DELETE_DEMAND', {idDemand: demand.id})
    } catch (error) {
      this._catchEx(error)
    }
  }


  @Delete('group/:id')
    async deleteGroup(@Param('id') id:string, @Req() req:Request):Promise<unknown> {
      try {
        return await this.uberService.send('DELETE_GROUP', {groupId:+id, userId: +req.user.userId})
    } catch (error) {
      this._catchEx(error)
    }
  }
}
