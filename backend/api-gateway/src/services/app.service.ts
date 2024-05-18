/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('MODULE_SERVICE') private client: ClientKafka
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  getModule() {
    this.client.emit('get-module', 'Module');
  }


}
