import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { StatusEnum } from './enum/status.enum';
import { Types } from 'mongoose';
import { Project } from '../project/project.schema';
import { CategoryEnum } from './enum/category.enum';
import { Step } from '../step/step.schema';

export type TaskDocument = Task & Document;

@Schema({collection: 'task', timestamps:true})
export class Task {
  @Prop({required:true})
  name : string;

  @Prop({required:true})
  description: string;

  @Prop({required:true})
  owner: string;

  @Prop({type: ()=> StatusEnum, required:true, default: StatusEnum.IN_PROGRESS })
  status: StatusEnum;

  @Prop({type: ()=> CategoryEnum, required:true, default: CategoryEnum.NONE })
  category: CategoryEnum;

  @Prop()
  budget: number;

  @Prop({required:true})
  startDate : Date;

  @Prop({required:true})
  expiryDate : Date;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Step' })
  step: Step | Types.ObjectId;

  @Prop()
  members: string[];

}

export const TaskSchema = SchemaFactory.createForClass(Task)
