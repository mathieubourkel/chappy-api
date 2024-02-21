import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
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
import { removeIdFromArray } from 'utils/removeObjInArray.utils';

@Controller()
export class TaskController extends BaseUtils {
  constructor(
    private readonly taskService: TaskService) {
    super()
  }

  @Post("/task")
  async create(
    @Body(new ValidationPipe()) body: CreateTaskDto, @Req() req:any) :Promise<TaskDocument> {
    try {
      const task:TaskDocument = await this.taskService.create({...body, owner: {id:+req.user.userId, email: req.user.email}});
    //  const projectOfStep:StepDocument = await this.stepService.getStepById(body.step.toString())
   //   if (!task || projectOfStep.project.toString() !== task.project.toString()) this._Ex("TASK CREATION FAILED", 400, "TC-BUILD-FAILED", "/" )
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
  async findTasksByOwner(@Req() req:any): Promise<TaskDocument[]> {
    try {
      if (!req.user.userId) this._Ex("USER DON'T EXIST", 404, "USER-NO-EXIST", "/" )
      return await this.taskService.getTasksByUser(+req.user.userId);
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/tasks/project/:idProject')
  async findTasksByIdProject( @Param('idProject') idProject: string): Promise<TaskDocument[]> {
    try {
      const tasks:TaskDocument[] =  await this.taskService.getTasksByIdProject(idProject);
      if (!tasks) this._Ex("TASKS DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return tasks;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get('/tasks/step/:idStep')
  async findTasksByIdStep( @Param('idStep') idStep: string): Promise<TaskDocument[]> {
    try {
      const tasks:TaskDocument[] = await this.taskService.getTasksByIdStep(idStep);
      if (!tasks) this._Ex("TASKS DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return tasks;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('/task/:id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto):Promise<Partial<TaskDocument>> {
    try {
      const task:Partial<TaskDocument> = await this.taskService.update(id, body);
      if (!task) this._Ex("UPDATE FAILED", 400, "TC-TASK-NOTUP", "/" )
      return task;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put('/task/members/delete')
  async deleteUserFromTask(@Body() body: any) {
    try {
      const task:any = await this.taskService.getTaskById(body.idTask)
      removeIdFromArray(task.members, body.idUser)
      await this.taskService.updateTaskMembers(task._id, task.members);
      if (!task) this._Ex("UPDATE FAILED", 400, "TS-PROJ-NOTUP", "/" )
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
