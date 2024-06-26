import { MiddlewareConsumer, Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { StepModule } from '../step/step.module';
import { verifyTokenMiddleware } from 'middlewares/tokens.middleware';
import { UberModule } from '@app/uber/uber.module';

@Module({
  imports:[MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
  forwardRef(() => StepModule), UberModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenMiddleware).forRoutes(TaskController);
  }
}
