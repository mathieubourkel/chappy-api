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
import {
  _catchEx,
  _Ex,
} from '../../exceptions/RcpExceptionFormated';


@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post('/')
  async create(@Body(new ValidationPipe()) body: CreateStepDto) : Promise<StepDocument> {
    try {
      const step:StepDocument = await this.stepService.create(body);
      if (!step) _Ex("STEP CREATION FAILED", 400, "SC-BUILD-FAILED", "/" )
      return step;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/:id')
  async findStepById(@Param('id') id: string): Promise<StepDocument> {
    try {
      const step:StepDocument = await this.stepService.getStepById(id);
      if (!step) _Ex("STEP DON'T EXIST", 404, "PS-NO-EXIST", "/" )
      return step;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateStepDto): Promise<Partial<StepDocument>> {
    try {
      const step:Partial<StepDocument> = await this.stepService.update(id, body);
      if (!step) _Ex("UPDATE FAILED", 400, "SC-STEP-NOTUP", "/" )
      return step;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Delete('/:id')
  delete(@Param('id') id: string):Promise<StepDocument> {
    const step:Promise<StepDocument> = this.stepService.delete(id);
    if (!step) _Ex("DELETE FAILED", 403, "SC-NO-DELETE", "/" );
    return step;
  }
}

