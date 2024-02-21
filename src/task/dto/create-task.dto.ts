import {
  IsDateString,
  IsEnum, IsInt, IsMongoId, IsNotEmpty, IsNumber,
  IsString,
  Length, Max,
} from 'class-validator';
import { Types } from 'mongoose';
import { StatusTaskEnum } from '../../../enums/statusTask.enum';
import { CategoryTaskEnum } from '../../../enums/categoryTask.enum';

export class CreateTaskDto {

  @IsString()
  @Length(1, 50)
  name:string;

  @IsString()
  @Length(1, 250)
  description:string;

  @IsEnum(StatusTaskEnum)
  @Max(3)
  status: StatusTaskEnum;

  @IsEnum(StatusTaskEnum)
  @Max(12)
  category: CategoryTaskEnum;

  @IsInt()
  budget:number;

  @IsDateString()
  startDate:Date;

  @IsDateString()
  endDate:Date;

  @IsMongoId()
  project: Types.ObjectId

  @IsMongoId()
  step: Types.ObjectId
  owner: {id: number, email:string}
}
