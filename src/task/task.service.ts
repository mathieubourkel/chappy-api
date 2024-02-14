import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { _catchEx } from '../project/exceptions/RcpExceptionFormated';



@Injectable()
export class TaskService {

  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>) {
  }


  async create(body: CreateTaskDto) :Promise<TaskDocument> {
    try {
      const task = new this.taskModel(body);
      return await task.save();
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTaskById(_id: string): Promise<TaskDocument> {
    try {
      return await this.taskModel.findOne({ _id });
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTasksByUser(id:string): Promise<TaskDocument[]> {
    try {
      return await this.taskModel.find({owner: id});
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTasksByIdProject(id: string): Promise<TaskDocument[]> {
    try {
      return await this.taskModel.find({project: id});
    } catch (error) {
      _catchEx(error)
    }
  }

  async getTasksByIdStep(id: string): Promise<TaskDocument[]> {
    try {
      return await this.taskModel.find({step: id});
    } catch (error) {
      _catchEx(error)
    }
  }

  async update(_id: string, body: UpdateTaskDto): Promise<Partial<TaskDocument>> {
    try {
      return await this.taskModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      _catchEx(error)
    }
  }

  async delete(_id: string):Promise<TaskDocument> {
    try {
      return await this.taskModel.findOneAndDelete({ _id });
    } catch (error) {
      _catchEx(error)
    }
  }
}
