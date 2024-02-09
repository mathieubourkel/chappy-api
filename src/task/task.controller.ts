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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { _catchEx, _Ex } from '../../exceptions/RcpExceptionFormated';
import { TaskDocument } from './task.schema';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post("/task")
  async create(
    @Body(new ValidationPipe()) body: CreateTaskDto) :Promise<TaskDocument> {
    try {
      return await this.taskService.create(body)
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/task/:id')
  async findTaskById(@Param('id') id: string): Promise<TaskDocument> {
    try {
      return await this.taskService.getTaskById(id);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/my-tasks')
  async findTasksByOwner(@Body() requestBody: { userId: string }): Promise<TaskDocument[]> {
    try {
      const userId = requestBody.userId;
      if (!userId) _Ex("USER DON'T EXIST", 404, "USER-NO-EXIST", "/" )
      return await this.taskService.getTasksByUser(userId);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/tasks/project/:idProject')
  async findTasksByIdProject( @Param('idProject') idProject: string): Promise<TaskDocument[]> {
    try {
      return await this.taskService.getTasksByIdProject(idProject);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/tasks/step/:idStep')
  async findTasksByIdStep( @Param('idStep') idStep: string): Promise<TaskDocument[]> {
    try {
      return await this.taskService.getTasksByIdStep(idStep);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Patch('/task/:id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto):Promise<Partial<TaskDocument>> {
    try {
      return await this.taskService.update(id, body);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Delete('/task/:id')
  delete(@Param('id') id: string):Promise<TaskDocument> {
    return this.taskService.delete(id);
  }
}
