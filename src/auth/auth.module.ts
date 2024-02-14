import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UberModule } from '@app/uber/uber.module';

@Module({
  imports: [UberModule],
  controllers: [AuthController],
})
export class AuthModule {}
