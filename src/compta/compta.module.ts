import { Module } from '@nestjs/common';
import { ComptaController } from './compta.controller';
import { UberModule } from '@app/uber/uber.module';

@Module({
  imports: [UberModule],
  controllers: [ComptaController],
})

export class ComptaModule {}