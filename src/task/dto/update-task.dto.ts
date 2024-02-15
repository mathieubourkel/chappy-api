import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDateString, IsEnum, IsInt, IsString, Length, Max } from 'class-validator';
import { StatusTaskEnum } from '../../../enums/statusTask.enum';
import { CategoryTaskEnum } from '../../../enums/categoryTask.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

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
  expiryDate:Date;

}
