import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import {
  BaseUtils
} from '../../libs/base/base.utils';



@Injectable()
export class TaskService extends BaseUtils {

  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>) {
    super()
  }


  async create(body: CreateTaskDto) :Promise<TaskDocument> {
    try {
      const task = new this.taskModel(body);
      return await task.save();
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getTaskById(_id: string): Promise<TaskDocument> {
    try {
      return await this.taskModel.findOne({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getTasksByUser(id:number): Promise<TaskDocument[]> {
    try {
      return await this.taskModel.find({owner: id});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getTasksByIdProject(_id: string): Promise<TaskDocument[]> {
    try {
      return await this.taskModel.find({project: _id});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getTasksByIdStep(_id: string): Promise<TaskDocument[]> {
    try {
      return await this.taskModel.find({step: _id});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async update(_id: string, body: UpdateTaskDto): Promise<Partial<TaskDocument>> {
    try {
      return await this.taskModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async delete(_id: string):Promise<TaskDocument> {
    try {
      return await this.taskModel.findOneAndDelete({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }
}
