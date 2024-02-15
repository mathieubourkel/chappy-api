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
import { TaskDocument } from './task.schema';
import { StepService } from '../step/step.service';
import { StepDocument } from '../step/step.schema';
import {
  BaseUtils
} from '../../libs/base/base.utils';

@Controller()
export class TaskController extends BaseUtils {
  constructor(
    private readonly taskService: TaskService,
    private readonly stepService: StepService
  ) {
    super()
  }

  @Post("/task")
  async create(
    @Body(new ValidationPipe()) body: CreateTaskDto) :Promise<TaskDocument> {
    try {
      const task:TaskDocument = await this.taskService.create(body);
      const projectOfStep:StepDocument = await this.stepService.getStepById(body.step.toString())
      if (!task || projectOfStep.project.toString() !== task.project.toString()) this._Ex("TASK CREATION FAILED", 400, "TC-BUILD-FAILED", "/" )
      return task;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/task/:id')
  async findTaskById(@Param('id') id: string): Promise<TaskDocument> {
    try {
      const task:TaskDocument =  await this.taskService.getTaskById(id);
      if (!task) this._Ex("TASK DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return task;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/my-tasks')
  async findTasksByOwner(@Body() requestBody: { userId: string}): Promise<TaskDocument[]> {
    try {
      const userId: string = requestBody.userId;
      if (!userId) this._Ex("USER DON'T EXIST", 404, "USER-NO-EXIST", "/" )
      return await this.taskService.getTasksByUser(userId);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/tasks/project/:idProject')
  async findTasksByIdProject( @Param('idProject') idProject: string): Promise<TaskDocument[]> {
    try {
      const tasks:TaskDocument[] =  await this.taskService.getTasksByIdProject(idProject);
      if (!tasks || tasks.length === 0) this._Ex("TASKS DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return tasks;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/tasks/step/:idStep')
  async findTasksByIdStep( @Param('idStep') idStep: string): Promise<TaskDocument[]> {
    try {
      const tasks:TaskDocument[] = await this.taskService.getTasksByIdStep(idStep);
      if (!tasks || tasks.length === 0) this._Ex("TASKS DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return tasks;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Patch('/task/:id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto):Promise<Partial<TaskDocument>> {
    try {
      const task:Partial<TaskDocument> = await this.taskService.update(id, body);
      if (!task) this._Ex("UPDATE FAILED", 400, "TC-TASK-NOTUP", "/" )
      return task;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Delete('/task/:id')
  delete(@Param('id') id: string):Promise<TaskDocument> {
    const task:Promise<TaskDocument> =  this.taskService.delete(id);
    if (!task) this._Ex("DELETE FAILED", 403, "TC-NO-DELETE", "/" );
    return task;
  }
}
