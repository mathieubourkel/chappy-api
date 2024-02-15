import { PartialType } from '@nestjs/mapped-types';
import { CreateStepDto } from './create-step.dto';
import {
  IsDateString,
  IsEnum, IsInt, IsMongoId,
  IsString,
  Length, Max,
} from 'class-validator';
import { StatusStepEnum } from '../../../enums/statusStep.enum';
import { Types } from 'mongoose';

export class UpdateStepDto extends PartialType(CreateStepDto) {

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

}
