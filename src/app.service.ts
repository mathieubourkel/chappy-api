import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {

  @Client({
    transport: Transport.NATS,
    options: {
      url: `nats://${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
    }
  })
  client: ClientProxy;

}
