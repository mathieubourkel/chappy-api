import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusProjectEnum } from '../../enums/statusProject.enum';
import { Step } from '../step/step.schema';
import { Task } from '../task/task.schema';
import { IsString } from 'class-validator';

export type ProjectDocument = Project & Document;

@Schema({ collection: 'project', timestamps: true })
export class Project {
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  description: string;

  @Prop({required:true,})
  @IsString()
  owner: number;

  @Prop({required:true})
  code: string;

  @Prop({type: ()=> StatusProjectEnum, required:true, default: StatusProjectEnum.IN_PROGRESS })
  status: StatusProjectEnum;

  @Prop({required:true})
  budget: number;

  @Prop({required:true})
  estimEndDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Step' }] })
  steps : Step[] | Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[] | Types.ObjectId[];

  @Prop()
  members: number[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);


