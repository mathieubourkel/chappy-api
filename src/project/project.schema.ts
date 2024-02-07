import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusEnum } from './enum/status.enum';

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

  @Prop()
  stepIds : string[];

  @Prop()
  taskIds: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
