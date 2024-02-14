import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import {
  UberModule
} from '@app/uber/uber.module';

@Module({
  imports: [UberModule],
  controllers: [CommentController],
})
export class CommentModule {}
