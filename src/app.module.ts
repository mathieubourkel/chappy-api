import { Module } from '@nestjs/common';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { StepModule } from './step/step.module';
import { TaskModule } from './task/task.module';
import { AppService } from './app.service';
import { msCommentController } from './ms-comment.controller';
import { msComptaController } from './ms-compta.controller';
import { msLogController } from './ms-log.controller';
import { msAuthController } from './ms-auth.controller';
import { msMediaController } from './ms-media.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,} ),
    MongooseModule.forRoot(  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DNS}`,
                             {dbName : "db-chappy-main"}),
    ProjectModule,
    StepModule,
    TaskModule
  ],
  controllers:[msCommentController, msComptaController, msLogController, msAuthController, msMediaController],
  providers: [AppService],
  exports : [AppService]
})
export class AppModule {}
