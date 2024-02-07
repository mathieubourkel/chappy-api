import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
// import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument, } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  // findAll() {
  //   return `This action returns all project`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} project`;
  // }
  //
  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
