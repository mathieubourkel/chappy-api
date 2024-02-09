import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusEnum } from './enum/status.enum';
import { Step } from '../step/step.schema';
import { Task } from '../task/task.schema';

export type ProjectDocument = Project & Document;

@Schema({ collection: 'project', timestamps: true })
export class Project {
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  description: string;

  @Prop({required:true})
  owner: string;

  @Prop({required:true})
  code: string;

  @Prop({type: ()=> StatusEnum, required:true, default: StatusEnum.IN_PROGRESS })
  status: StatusEnum;

  @Prop({required:true})
  globalBudget: number;

  @Prop({required:true})
  estimEndDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Step' }] })
  steps : Step[] | Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[] | Types.ObjectId[];

  @Prop()
  members: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);


