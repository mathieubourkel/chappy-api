import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { _catchEx, _Ex } from '../../exceptions/RcpExceptionFormated';



@Injectable()
export class TaskService {

  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>) {
  }


  async create(body: CreateTaskDto) :Promise<TaskDocument> {
    try {
      const task = new this.taskModel(body);
      if (!task) _Ex("TASK CREATION FAILED", 400, "TC-BUILD-FAILED", "/" )
      return await task.save();
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTaskById(_id: string): Promise<TaskDocument> {
    try {
      const task = await this.taskModel.findOne({ _id });
      if (!task) _Ex("TASK DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return task;
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTasksByUser(id: string): Promise<TaskDocument[]> {
    try {
      const tasks = await this.taskModel.find({owner: id});
      if (!tasks || tasks.length === 0) _Ex("TASKS DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return tasks;
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTasksByIdProject(id: string): Promise<TaskDocument[]> {
    try {
      const tasks = await this.taskModel.find({project: id});
      if (!tasks || tasks.length === 0) _Ex("TASKS DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return tasks;
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTasksByIdStep(id: string): Promise<TaskDocument[]> {
    try {
      const tasks = await this.taskModel.find({step: id});
      if (!tasks || tasks.length === 0) _Ex("TASKS DON'T EXIST", 404, "TC-NO-EXIST", "/" )
      return tasks;
    } catch (error) {
      _catchEx(error)
    }
  }

  async update(_id: string, body: UpdateTaskDto): Promise<Partial<TaskDocument>> {
    try {
      const task = await this.taskModel.findOneAndUpdate({ _id }, body, {new : true});
      if (!task) _Ex("UPDATE FAILED", 400, "TC-TASK-NOTUP", "/" )
      return task
    } catch (error) {
      _catchEx(error)
    }
  }

  async delete(_id: string):Promise<TaskDocument> {
    try {
      const task = await this.taskModel.findOneAndDelete({ _id });
      if (!task) _Ex("DELETE FAILED", 403, "TC-NO-DELETE", "/" );
      return task;
    } catch (error) {
      _catchEx(error)
    }
  }
}
