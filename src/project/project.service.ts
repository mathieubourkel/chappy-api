import {
  Body,
  Injectable,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument, } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { _catchEx, _Ex, } from '../../exceptions/RcpExceptionFormated';
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
        if (!project) _Ex("PROJECT CREATION FAILED", 400, "PC-BUILD-FAILED", "/" )
      return await project.save();
    } catch (error) {
      _catchEx(error)
    }
  }

  async getProjectById(_id: string): Promise<ProjectDocument> {
    try {
      const project = await this.projectModel.findOne({ _id });
        if (!project) _Ex("PROJECT DON'T EXIST", 404, "PC-NO-EXIST", "/" )
      return project;
    } catch (error) {
      _catchEx(error)
    }
  }

  async getProjectsByUser(id: string): Promise<ProjectDocument[]> {
    try {
      const projects = await this.projectModel.find({owner: id});
      if (!projects || projects.length === 0) _Ex("PROJECTS DON'T EXIST", 404, "PC-NO-EXIST", "/" )
      return projects;
    } catch (error) {
      _catchEx(error)
    }
  }

  async update(_id: string, body: UpdateProjectDto): Promise<Partial<ProjectDocument>> {
    try {
      const project = await this.projectModel.findOneAndUpdate({ _id }, body, {new : true});
        if (!project) _Ex("UPDATE FAILED", 400, "PC-PROJ-NOTUP", "/" )
      return project
    } catch (error) {
      _catchEx(error)
    }
  }

  async delete(_id: string):Promise<ProjectDocument> {
    try {
      const project = await this.projectModel.findOneAndDelete({ _id });
        if (!project) _Ex("DELETE FAILED", 403, "PC-NO-DELETE", "/" );
      return project;
    } catch (error) {
      _catchEx(error)
    }
  }
}
