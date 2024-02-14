import { Module } from '@nestjs/common';
import { UberService } from './uber.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UBER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  providers: [UberService],
  exports: [UberService],
})
export class UberModule {}
