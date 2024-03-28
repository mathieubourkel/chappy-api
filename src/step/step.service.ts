import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Step, StepDocument, } from './step.schema';
import { BaseUtils } from '../../libs/base/base.utils';

@Injectable()
export class StepService extends BaseUtils {

  constructor(
    @InjectModel(Step.name)
    private stepModel: Model<StepDocument>) {
    super()
  }

  async create(body: CreateStepDto): Promise<StepDocument> {
    try {
      const step = new this.stepModel(body);
      return await step.save();
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getStepById(_id: string) : Promise<StepDocument> {
    try {
      return await this.stepModel.findOne({ _id }).populate(["project", "project.members"]);
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getStepsByIdProject(idProject: string) : Promise<StepDocument[]> {
    try {
      return await this.stepModel.find({project: idProject });
    } catch (error) {
      this._catchEx(error)
    }
  }

  async update(_id: string, body: UpdateStepDto) :Promise<Partial<StepDocument>> {
    try {
      // @ts-ignore
      return await this.stepModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async delete(_id: string) : Promise<StepDocument> {
    try {
      return  await this.stepModel.findOneAndDelete({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }

  async deleteMany(searchOptions:{}) : Promise<unknown> {
    try {
      return await this.stepModel.deleteMany(searchOptions);
    } catch (error) {
      this._catchEx(error)
    }
  }
  }

