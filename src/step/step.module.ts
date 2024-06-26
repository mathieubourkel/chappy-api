import { Module, forwardRef} from '@nestjs/common';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Step, StepSchema } from './step.schema';
import { TaskModule } from 'src/task/task.module';
import { ProjectModule } from 'src/project/project.module';


@Module({
  imports:[MongooseModule.forFeature([{name: Step.name, schema: StepSchema}]),
  forwardRef(() => TaskModule),forwardRef(() => ProjectModule)
],
  controllers: [StepController],
  providers: [StepService],
  exports: [StepService]
})
export class StepModule {}
