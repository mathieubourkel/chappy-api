import {
  Body,
  Injectable,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument, } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { _catchEx, _Ex, } from './exceptions/RcpExceptionFormated';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {


  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>) {
  }

  async create(body: CreateProjectDto):Promise<ProjectDocument> {
    try {
      const project = new this.projectModel(body);
      return await project.save();
    } catch (error) {
      _catchEx(error)
    }
  }

  async getProjectById(_id: string): Promise<ProjectDocument> {
    try {
      return await this.projectModel.findOne({ _id });
    } catch (error) {
      _catchEx(error)
    }
  }

  async getProjectsByUser(id: string): Promise<ProjectDocument[]> {
    try {
      return await this.projectModel.find({owner: id});
    } catch (error) {
      _catchEx(error)
    }
  }

  async update(_id: string, body: UpdateProjectDto): Promise<Partial<ProjectDocument>> {
    try {
      // @ts-ignore
      return await this.projectModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      _catchEx(error)
    }
  }

  async delete(_id: string):Promise<ProjectDocument> {
    try {
      return await this.projectModel.findOneAndDelete({ _id });
    } catch (error) {
      _catchEx(error)
    }
  }
}
