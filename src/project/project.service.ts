import { Injectable, } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument, } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, StringExpression, Types } from 'mongoose';
import { UpdateProjectDto } from './dto/update-project.dto';
import { BaseUtils } from '../../libs/base/base.utils';

@Injectable()
export class ProjectService extends BaseUtils {


  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>) {
    super()
  }

  async create(body: CreateProjectDto):Promise<ProjectDocument> {
    try {
      const project = new this.projectModel(body);
      return await project.save();
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getProjectById(_id: string): Promise<ProjectDocument> {
    try {
      return await this.projectModel.findOne({ _id }).populate('steps');
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getProjectsByUser(id: number): Promise<ProjectDocument[]> {
    try {
      return await this.projectModel.find({'owner.id': id}).populate('steps').exec();
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getProjectsIfMembers(id: number): Promise<ProjectDocument[]> {
    try {
      return await this.projectModel.find({'members': { $elemMatch: { 'id': id } }}).populate('steps').exec();
    } catch (error) {
      this._catchEx(error)
    }
  }

  async update(_id: string, body: UpdateProjectDto): Promise<Partial<ProjectDocument>> {
    try {
      // @ts-ignore
      return await this.projectModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async pushStep(_id: Types.ObjectId, stepId: string): Promise<Partial<ProjectDocument>> {
    try {
      // @ts-ignore
      return await this.projectModel.findOneAndUpdate({ _id }, {$push : { steps: stepId}});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async updateProjectMembers(_id: string, newArr:[{id: number, email:string}]):Promise<ProjectDocument> {
    try {
      return await this.projectModel.findOneAndUpdate({ _id }, {members: newArr}, {new : true});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async delete(_id: string):Promise<ProjectDocument> {
    try {
      return await this.projectModel.findOneAndDelete({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }
}
