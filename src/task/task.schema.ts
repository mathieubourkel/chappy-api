import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { StatusEnum } from './enum/status.enum';
import { Types } from 'mongoose';
import { Project } from '../project/project.schema';
import { CategoryEnum } from './enum/category.enum';

export type TaskDocument = Task & Document;

@Schema({collection: 'task', timestamps:true})
export class Task {
  @Prop({required:true})
  name : string;

  @Prop({required:true})
  description: string;

  @Prop({type: ()=> StatusEnum, required:true, default: StatusEnum.IN_PROGRESS })
  status: StatusEnum;

  @Prop({type: ()=> CategoryEnum, required:true, default: CategoryEnum.NONE })
  category: CategoryEnum;

  @Prop()
  budget: number;

  @Prop({required:true})
  StartDate : Date;

  @Prop({required:true})
  ExpiryDate : Date;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project | Types.ObjectId;

  @Prop()
  stepIds: []

}

export const TaskSchema = SchemaFactory.createForClass(Task)
