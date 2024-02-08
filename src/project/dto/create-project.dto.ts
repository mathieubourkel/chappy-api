import {
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  Length,
  Max,
} from 'class-validator';
import { StatusEnum } from '../../step/enum/status.enum';

export class CreateProjectDto {
  @IsString()
  @Length(1, 50)
  name:string;

  @IsString()
  @Length(1, 250)
  description:string;

  @IsString()
  @Length(1, 50)
  owner:string;

  @IsString()
  @Length(1, 16)
  code:string;

  @IsEnum(StatusEnum)
  @Max(3)
  status:StatusEnum;

  @IsInt()
  globalBudget:number;

  @IsDateString()
  estimEndDate:Date;

}
