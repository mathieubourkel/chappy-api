import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDateString, IsEnum, IsInt, IsString, Length, Max } from 'class-validator';
import { StatusEnum } from '../enum/status.enum';
import { CategoryEnum } from '../enum/category.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

  @IsString()
  @Length(1, 50)
  name:string;

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

}
