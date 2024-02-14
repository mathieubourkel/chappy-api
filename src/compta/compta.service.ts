import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ComptaService {

  constructor(
    @Inject('UBER') private client: ClientProxy,
  ) {}
  
  async getComptas(params:any) {
    try {
      return await firstValueFrom(this.client.send('GET_COMPTAS', params));
    } catch (error) {
      return error
    }
  }

  findAll() {
    return `This action returns all compta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compta`;
  }

  update(id: number, updateComptaDto: any) {
    return `This action updates a #${id} compta`;
  }

  remove(id: number) {
    return `This action removes a #${id} compta`;
  }
}
