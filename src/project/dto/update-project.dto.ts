import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import {
  IsDate,
  IsInt, IsNotEmpty,
  IsString,
  Length, Max,
} from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name:string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  description:string;

  @IsInt()
  @Max(3)
  status:number;

  @IsInt()
  globalBudget:number;

  @IsDate()
  estimEndDate:Date;
}
