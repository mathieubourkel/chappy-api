import {
  IsDate,
  IsEnum,
  IsInt, IsNotEmpty, IsNumber,
  IsString,
  Length,
  Max, MinLength,
} from 'class-validator';
import { StatusEnum } from '../../step/enum/status.enum';

export class CreateProjectDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  name:string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  description:string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsString()
  @Length(1, 16)
  @IsNotEmpty()
  code:string;

  @IsEnum(StatusEnum)
  @Max(3)
  status:StatusEnum;

  @IsInt()
  @MinLength(0)
  globalBudget:number;

  @IsDate()
  estimEndDate:Date;

}
