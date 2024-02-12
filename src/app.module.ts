import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { StepModule } from './step/step.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,} ),
    MongooseModule.forRoot(  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DNS}`,
                             {dbName : "db-chappy-main"}),
    ProjectModule,
    StepModule,
    TaskModule
  ]
})
export class AppModule {}
