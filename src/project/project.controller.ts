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
import { _catchEx, _Ex, } from '../../exceptions/RcpExceptionFormated';
import { UpdateProjectDto } from './dto/update-project.dto';


@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('project')
  async create(
    @Body(new ValidationPipe()) body: CreateProjectDto) :Promise<ProjectDocument> {
    try {
      return await this.projectService.create(body)
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/project/:id')
  async findProjectById(@Param('id') id: string): Promise<ProjectDocument> {
    try {
      return await this.projectService.getProjectById(id);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/my-projects')
  async findProjectsByOwner(@Body() requestBody: { userId: string }): Promise<ProjectDocument[]> {
    try {
      const userId = requestBody.userId;
      if (!userId) _Ex("USER DON'T EXIST", 404, "USER-NO-EXIST", "/" )
      return await this.projectService.getProjectsByUser(userId);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Patch('/project/:id')
  async update(@Param('id') id: string, @Body() body: UpdateProjectDto):Promise<Partial<ProjectDocument>> {
    try {
      return await this.projectService.update(id, body);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Delete('/project/:id')
  delete(@Param('id') id: string):Promise<ProjectDocument> {
    return this.projectService.delete(id);
  }
}
