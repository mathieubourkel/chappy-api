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
  IsNotEmpty, IsString, MinDate, IsInt
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

  @Prop({type: { id: Number, email: String },_id: false, required:true})
  owner: {id: number, email:string};

  @Prop({type: ()=> StatusTaskEnum, required:true, default: StatusTaskEnum.IN_PROGRESS })
  status: StatusTaskEnum;

  @Prop({type: ()=> CategoryTaskEnum, required:true, default: CategoryTaskEnum.CARPENTRY })
  category: CategoryTaskEnum;

  @Prop()
  budget: number;

  @IsDate()
  @Prop({required:true})
  startDate : Date;

  @IsDate()
  @Prop({required:true})
  endDate : Date;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Step' })
  step: Step | Types.ObjectId;

  @Prop({type: [{id: Number, email: String}], _id:false})
  members: [{id: number, email:string}]

}

export const TaskSchema = SchemaFactory.createForClass(Task)
