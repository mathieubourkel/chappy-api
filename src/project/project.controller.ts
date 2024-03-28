import {Controller,Get,Post,Body,Put,Param,Delete,Req,ValidationPipe,} from '@nestjs/common';
import { ProjectService } from './project.service';
import { StepService } from '../step/step.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDocument } from './project.schema';
import { UpdateProjectDto } from './dto/update-project.dto';
import { BaseUtils } from '../../libs/base/base.utils';
import { UberService } from '@app/uber/uber.service';
import { removeIdFromArray } from 'utils/removeObjInArray.utils';
import { convertArrayOfUserToModelNotif } from 'utils/convertArrayToModel';
import { LogsStatusEnum } from 'enums/logs.status.enum';
import { Request } from 'express';
import { __generateInvitationCode } from 'utils/generateInvitationCode';


@Controller()
export class ProjectController extends BaseUtils{
  constructor(private readonly projectService: ProjectService,
    private readonly stepService: StepService,
    private readonly uberService: UberService
    ) {
    super()
  }

  @Post('project')
  async create(
    @Body(new ValidationPipe()) body: CreateProjectDto, @Req() req:Request) :Promise<ProjectDocument> {
    try {
      const project:ProjectDocument = await this.projectService.create({...body, code: __generateInvitationCode(), owner: {id:+req.user.userId, email: req.user.email}});
      if (!project) this._Ex("PROJECT CREATION FAILED", 400, "PC-BUILD-FAILED", "/" )
      this.uberService.emit("ADD_MANY_LOGS", 
        {data:{message: `${project.owner.email} vous a invité sur le projet ${project.name}`, status: LogsStatusEnum.NEW }, 
        arrayModel: convertArrayOfUserToModelNotif(project.members)
      })
      return project;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/project/:id')
  async findProjectById(@Param('id') _id: string): Promise<ProjectDocument> {
    try {
      const project:ProjectDocument = await this.projectService.getProjectById(_id);
      project.steps = await this.stepService.getStepsByIdProject(_id)
      if (!project) this._Ex("PROJECT DON'T EXIST", 404, "PC-NO-EXIST", "/" )
      return project;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/my-projects')
  async findProjectsByOwner(@Req() req:Request): Promise<ProjectDocument[]> {
    try {
      return await this.projectService.getProjectsByUser(+req.user.userId);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/my-collabs')
  async findProjectsIfMember(@Req() req:Request): Promise<ProjectDocument[]> {
    try {
      return await this.projectService.getProjectsIfMembers(+req.user.userId);
    } catch (error) {
      this._catchEx(error)
    }
  }


  @Put('/project/:id')
  async update(@Param('id') id: string, @Body() body: UpdateProjectDto):Promise<Partial<ProjectDocument>> {
    try {
      const project:Partial<ProjectDocument> = await this.projectService.update(id, body);
      if (!project) this._Ex("UPDATE FAILED", 400, "PC-PROJ-NOTUP", "/" )
      return project;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('/project/members/delete')
  async deleteUserFromProject(@Body() body: {idProject:string, idUser:number}):Promise<ProjectDocument> {
    try {
      const project:ProjectDocument = await this.projectService.getProjectById(body.idProject)
      removeIdFromArray(project.members, body.idUser)
      await this.projectService.updateProjectMembers(project._id, project.members);
      if (!project) this._Ex("UPDATE FAILED", 400, "PC-PROJ-NOTUP", "/" )
      return project;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('/project/members/add')
  async addUserToProject(@Body() body: {idProject: string, idUser: number, email:string}):Promise<ProjectDocument> {
    try {
      const project:ProjectDocument = await this.projectService.getProjectById(body.idProject)
      project.members.push({id: body.idUser, email: body.email})
      await this.projectService.updateProjectMembers(project._id, project.members);
      if (!project) this._Ex("UPDATE FAILED", 400, "PC-PROJ-NOTUP", "/" )
      return project;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Delete('/project/:id')
  async delete(@Param('id') id: string):Promise<ProjectDocument> {
    const project:ProjectDocument = await this.projectService.delete(id);
    await this.stepService.deleteMany({project: id})
    if (!project) this._Ex("DELETE FAILED", 403, "PC-NO-DELETE", "/" );
    return project;
  } 
}
