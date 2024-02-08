import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { StepService } from './step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { StepDocument } from './step.schema';
import { _catchEx } from '../../exceptions/RcpExceptionFormated';


@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post('/')
  async create(@Body(new ValidationPipe()) body: CreateStepDto) : Promise<StepDocument> {
    try {
      return await this.stepService.create(body)
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/:id')
  async findStepById(@Param('id') id: string): Promise<StepDocument> {
    try {
      return await this.stepService.getStepById(id);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateStepDto): Promise<Partial<StepDocument>> {
    try {
      return await this.stepService.update(id, body);
    } catch (error) {
      _catchEx(error)
    }
  }

  @Delete('/:id')
  delete(@Param('id') id: string):Promise<StepDocument> {
    return this.stepService.delete(id);
  }
}

