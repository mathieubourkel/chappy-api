import { IsDateString, IsEnum, IsInt, IsMongoId, IsString, Length, Max } from 'class-validator';
import { Types } from 'mongoose';
import { StatusEnum } from '../enum/status.enum';

export class CreateStepDto {

  @IsString()
  @Length(1, 50)
  name:string;

  @IsString()
  @Length(1, 250)
  description:string;

  @IsEnum(StatusEnum)
  @Max(3)
  status: StatusEnum;

  @IsInt()
  budget:number;

  @IsDateString()
  estimEndDate:Date;

  @IsMongoId()
  project: Types.ObjectId

}
