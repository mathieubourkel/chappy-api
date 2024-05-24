import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { StepService } from './step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { StepDocument } from './step.schema';
import { BaseUtils } from '../../libs/base/base.utils';
import { TaskService } from 'src/task/task.service';
import { ProjectService } from 'src/project/project.service';


@Controller('step')
export class StepController extends BaseUtils {
  constructor(private readonly stepService: StepService,
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService) {
    super()
  }

  @Post()
  async create(@Body(new ValidationPipe()) body: CreateStepDto) : Promise<StepDocument> {
    try {
      const step:any = await this.stepService.create(body);
      await this.projectService.pushStep(body.project, step._id)
      return step;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Get(':id')
  async findStepById(@Param('id') id: string): Promise<StepDocument> {
    try {
      const step:StepDocument = await this.stepService.getStepById(id);
      if (!step) this._Ex("STEP DON'T EXIST", 404, "PS-NO-EXIST", "/" )
      step.tasks = await this.taskService.getTasksByIdStep(id)
      return step;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateStepDto): Promise<Partial<StepDocument>> {
    try {
      const step:Partial<StepDocument> = await this.stepService.update(id, body);
      if (!step) this._Ex("UPDATE FAILED", 400, "SC-STEP-NOTUP", "/" )
      return step;
    } catch (error) {
      this._catchEx(error)
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string):Promise<StepDocument> {
    try {
      const step:StepDocument = await this.stepService.delete(id);
      await this.taskService.deleteMany({step:id})
      if (!step) this._Ex("DELETE FAILED", 403, "SC-NO-DELETE", "/" );
    return step;
    } catch (error) {
      this._catchEx(error)
    }
  }
}

