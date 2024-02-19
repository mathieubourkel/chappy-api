import { Module } from '@nestjs/common';
import { UberService } from './uber.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,} ),
    ClientsModule.register([
      {
        name: 'UBER',
        transport: Transport.NATS,
        options: {
          servers: [`nats://${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`]
        },
      },
    ]),
  ],
  providers: [UberService],
  exports: [UberService],
})
export class UberModule {}
