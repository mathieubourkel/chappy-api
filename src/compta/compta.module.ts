import { Module } from '@nestjs/common';
import { ComptaService } from './compta.service';
import { ComptaController } from './compta.controller';

@Module({
  controllers: [ComptaController],
  providers: [ComptaService],
})
export class ComptaModule {}
