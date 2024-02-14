import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDocument } from './project.schema';
import { _catchEx, _Ex, } from './exceptions/RcpExceptionFormated';
import { UpdateProjectDto } from './dto/update-project.dto';


@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('project')
  async create(
    @Body(new ValidationPipe()) body: CreateProjectDto) :Promise<ProjectDocument> {
    try {
      const project:ProjectDocument = await this.projectService.create(body);
      if (!project) _Ex("PROJECT CREATION FAILED", 400, "PC-BUILD-FAILED", "/" )
      return project;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/project/:id')
  async findProjectById(@Param('id') id: string): Promise<ProjectDocument> {
    try {
      const project:ProjectDocument = await this.projectService.getProjectById(id);
      if (!project) _Ex("PROJECT DON'T EXIST", 404, "PC-NO-EXIST", "/" )
      return project;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/my-projects')
  async findProjectsByOwner(@Body() requestBody: { userId: string }): Promise<ProjectDocument[]> {
    try {
      const userId:string = requestBody.userId;
      if (!userId || userId) _Ex("USER DON'T EXIST", 404, "USER-NO-EXIST", "/" )
      const projects:ProjectDocument[] =  await this.projectService.getProjectsByUser(userId);
      if (!projects || projects.length === 0) _Ex("PROJECTS DON'T EXIST", 404, "PC-NO-EXIST", "/" )
      return projects;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Patch('/project/:id')
  async update(@Param('id') id: string, @Body() body: UpdateProjectDto):Promise<Partial<ProjectDocument>> {
    try {
      const project:Partial<ProjectDocument> = await this.projectService.update(id, body);
      if (!project) _Ex("UPDATE FAILED", 400, "PC-PROJ-NOTUP", "/" )
      return project;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Delete('/project/:id')
  delete(@Param('id') id: string):Promise<ProjectDocument> {
    const project:Promise<ProjectDocument> = this.projectService.delete(id);
    if (!project) _Ex("DELETE FAILED", 403, "PC-NO-DELETE", "/" );
    return project;
  }
}
