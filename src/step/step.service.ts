import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Step, StepDocument, } from './step.schema';
import { _catchEx, _Ex, } from '../../exceptions/RcpExceptionFormated';

@Injectable()
export class StepService {

  constructor(
    @InjectModel(Step.name)
    private stepModel: Model<StepDocument>) {
  }

  async create(body: CreateStepDto): Promise<StepDocument> {
    try {
      const step = new this.stepModel(body);
      if (!step) _Ex("STEP CREATION FAILED", 400, "SC-BUILD-FAILED", "/" )
      return await step.save();
    } catch (error) {
      _catchEx(error)
    }
  }

  async getStepById(_id: string) : Promise<StepDocument> {
    try {
      const step = await this.stepModel.findOne({ _id });
      if (!step) _Ex("STEP DON'T EXIST", 404, "PS-NO-EXIST", "/" )
      return step;
    } catch (error) {
      _catchEx(error)
    }
  }

  async update(_id: string, body: UpdateStepDto) :Promise<Partial<StepDocument>> {
    try {
      const step = await this.stepModel.findOneAndUpdate({ _id }, body, {new : true});
      if (!step) _Ex("UPDATE FAILED", 400, "SC-STEP-NOTUP", "/" )
      return step
    } catch (error) {
      _catchEx(error)
    }
  }

  async delete(_id: string) : Promise<StepDocument> {
    try {
      const step = await this.stepModel.findOneAndDelete({ _id });
      if (!step) _Ex("DELETE FAILED", 403, "SC-NO-DELETE", "/" );
      return step;
    } catch (error) {
      _catchEx(error)
    }
  }
  }

