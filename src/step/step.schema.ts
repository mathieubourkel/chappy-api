import { Project } from '../project/project.schema';
import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { StatusStepEnum } from '../../enums/statusStep.enum';
import { Task } from '../task/task.schema';

export type StepDocument = Step & Document;

@Schema({ collection: 'step', timestamps: true })
export class Step {
  @Prop({required:true})
  name : string;

  @Prop({required:true})
  description: string;

  @Prop({type: ()=> StatusStepEnum, required:true, default: StatusStepEnum.IN_PROGRESS })
  status: StatusStepEnum;

  @Prop()
  budget: number;

  @Prop({required:true})
  estimEndDate : Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[] | Types.ObjectId[];

}

export const StepSchema = SchemaFactory.createForClass(Step);
