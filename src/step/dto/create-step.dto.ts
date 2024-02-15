import { IsDateString, IsEnum, IsInt, IsMongoId, IsString, Length, Max } from 'class-validator';
import { Types } from 'mongoose';
import { StatusStepEnum } from '../../../enums/statusStep.enum';

export class CreateStepDto {

  @IsString()
  @Length(1, 50)
  name:string;

  @IsString()
  @Length(1, 250)
  description:string;

  @IsEnum(StatusStepEnum)
  @Max(3)
  status: StatusStepEnum;

  @IsInt()
  budget:number;

  @IsDateString()
  estimEndDate:Date;

  @IsMongoId()
  project: Types.ObjectId

}
