import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LogService {

  constructor(
    @Inject('UBER') private client: ClientProxy
  ) {}

}
