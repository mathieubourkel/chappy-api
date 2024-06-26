import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { StepModule } from './step/step.module';
import { TaskModule } from './task/task.module';
import { ComptaModule } from './compta/compta.module';
import { LogModule } from './log/log.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { verifyMailMiddleware, verifyRefreshMiddleware, verifyTokenMiddleware, verifyValidateAccountMiddleware } from 'middlewares/tokens.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,} ),
    MongooseModule.forRoot(  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DNS}`,
                             {dbName : process.env.MONGO_DB_MAIN}),
    ProjectModule,
    StepModule,
    TaskModule,
    ComptaModule,
    LogModule,
    AuthModule,
    CommentModule,
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenMiddleware).forRoutes( 'log', 'step','compta', 'user', 'group');
    consumer.apply(verifyRefreshMiddleware).forRoutes('auth/refreshToken');
    consumer.apply(verifyMailMiddleware).forRoutes('auth/resetPwd/withMail');
    consumer.apply(verifyValidateAccountMiddleware).forRoutes('auth/validateAccount/:validateToken');
  }
}
