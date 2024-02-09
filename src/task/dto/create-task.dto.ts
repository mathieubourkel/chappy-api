import {
  IsDateString,
  IsEnum, IsInt, IsMongoId,
  IsString,
  Length, Max,
} from 'class-validator';
import { Types } from 'mongoose';
import { StatusEnum } from '../enum/status.enum';
import {
  CategoryEnum
} from '../enum/category.enum';

export class CreateTaskDto {

  @IsString()
  @Length(1, 50)
  name:string;

  @IsString()
  @Length(1, 50)
  owner: string;

  @IsString()
  @Length(1, 250)
  description:string;

  @IsEnum(StatusEnum)
  @Max(3)
  status: StatusEnum;

  @IsEnum(StatusEnum)
  @Max(12)
  category: CategoryEnum;

  @IsInt()
  budget:number;

  @IsDateString()
  startDate:Date;

  @IsDateString()
  expiryDate:Date;

  @IsMongoId()
  project: Types.ObjectId

  @IsMongoId()
  step: Types.ObjectId

}
