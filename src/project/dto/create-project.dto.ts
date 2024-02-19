import {
  IsDateString,
  IsEnum,
  IsInt, IsNotEmpty, IsNumber,
  IsString,
  Length,
  Min,
  Max, MinLength,
} from 'class-validator';
import { StatusStepEnum } from '../../../enums/statusStep.enum';

export class CreateProjectDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  name:string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  description:string;

  @IsEnum(StatusStepEnum)
  @Max(3)
  status:StatusStepEnum;

  @IsInt()
  @Min(1)
  budget:number;

  @IsDateString()
  estimEndDate:Date;
  code:string;
  owner:number;

}
