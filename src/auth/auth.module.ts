import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UberModule } from '@app/uber/uber.module';
import { ProjectModule } from '../project/project.module'

@Module({
  imports: [UberModule, ProjectModule],
  controllers: [AuthController],
})
export class AuthModule {}
