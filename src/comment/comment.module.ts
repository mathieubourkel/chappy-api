import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import {
  UberModule
} from '@app/uber/uber.module';
import {
  CommentResponseController
} from './comment_response.controller';

@Module({
  imports: [UberModule],
  controllers: [CommentController, CommentResponseController],
})
export class CommentModule {}
