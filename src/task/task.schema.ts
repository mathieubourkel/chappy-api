import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { StatusTaskEnum } from '../../enums/statusTask.enum';
import { Types } from 'mongoose';
import { Project } from '../project/project.schema';
import { CategoryTaskEnum } from '../../enums/categoryTask.enum';
import { Step } from '../step/step.schema';
import {
  IsDate,
  IsNotEmpty, IsString, MinDate,
} from 'class-validator';

export type TaskDocument = Task & Document;

@Schema({collection: 'task', timestamps:true})
export class Task {
  @IsNotEmpty()
  @Prop({required:true})
  name : string;

  @IsNotEmpty()
  @Prop({required:true})
  description: string;

  @IsNotEmpty()
  @IsString()
  @Prop({required:true})
  owner: string;

  @Prop({type: ()=> StatusTaskEnum, required:true, default: StatusTaskEnum.IN_PROGRESS })
  status: StatusTaskEnum;

  @Prop({type: ()=> CategoryTaskEnum, required:true, default: CategoryTaskEnum.NONE })
  category: CategoryTaskEnum;

  @Prop()
  budget: number;

  @IsDate()
  @Prop({required:true})
  startDate : Date;

  @IsDate()
  @Prop({required:true})
  expiryDate : Date;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Step' })
  step: Step | Types.ObjectId;

  @Prop()
  members: string[] | number[];

}

export const TaskSchema = SchemaFactory.createForClass(Task)
