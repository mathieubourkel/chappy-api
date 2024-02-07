import { IsDateString, IsInt, IsString, Length, Max } from 'class-validator';

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

  @IsInt()
  @Max(3)
  status:number;

  @IsInt()
  globalBudget:number;

  @IsDateString()
  estimEndDate:Date;

}
