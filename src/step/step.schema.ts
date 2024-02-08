import { Project } from '../project/project.schema';
import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { StatusEnum } from './enum/status.enum';

export type StepDocument = Step & Document;

@Schema({ collection: 'step', timestamps: true })
export class Step {
  @Prop({required:true})
  name : string;

  @Prop({required:true})
  description: string;

  @Prop({type: ()=> StatusEnum, required:true, default: StatusEnum.IN_PROGRESS })
  status: StatusEnum;

  @Prop()
  budget: number;

  @Prop({required:true})
  estimEndDate : Date;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project | Types.ObjectId;

  @Prop()
  taskIds: []

}

export const StepSchema = SchemaFactory.createForClass(Step);
