import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UberService {
  constructor(
    @Inject('UBER')
    private readonly uber: ClientProxy,
  ) {}

  async send(key: string, data: unknown): Promise<unknown> {
    return await firstValueFrom(this.uber.send(key, data));
  }

  async emit(key: string, data: unknown): Promise<void> {
    this.uber.emit(key, data);
  }
}
