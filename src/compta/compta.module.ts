import { Module } from '@nestjs/common';
import { ComptaController } from './compta.controller';
import { UberService } from '@app/uber/uber.service';
import { UberModule } from '@app/uber/uber.module';

@Module({
  imports: [UberModule],
  controllers: [ComptaController],
  providers: [UberService]
})

export class ComptaModule {}
