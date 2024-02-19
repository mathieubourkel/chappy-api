import {
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { CommentController } from './comment.controller';
import {
  UberModule
} from '@app/uber/uber.module';
import {
  CommentResponseController
} from './comment_response.controller';
import {
  verifyTokenMiddleware
} from '../../middlewares/tokens.middleware';
import {
  ProjectController
} from '../project/project.controller';

@Module({
  imports: [UberModule],
  controllers: [CommentController, CommentResponseController],
})
export class CommentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenMiddleware).forRoutes(CommentController);
    consumer.apply(verifyTokenMiddleware).forRoutes(CommentResponseController);
  }
}
