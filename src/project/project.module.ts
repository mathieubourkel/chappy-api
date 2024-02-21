import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema, } from './project.schema';
import { verifyTokenMiddleware } from 'middlewares/tokens.middleware';
import {StepModule} from "../step/step.module"
import { UberModule } from '@app/uber/uber.module';

@Module({
  imports:[MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
StepModule, UberModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenMiddleware).forRoutes(ProjectController);
  }
}
