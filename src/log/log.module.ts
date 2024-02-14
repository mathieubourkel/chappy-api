import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { UberModule } from '@app/uber/uber.module';

@Module({
  imports: [UberModule],
  controllers: [LogController],
})
export class LogModule {}
