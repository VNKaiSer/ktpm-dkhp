import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, 'protos/users.proto'),
          url: 'localhost:50051',
        },
      },
      {
        name: 'MODULE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['103.72.99.224:9092'],
            connectionTimeout: 3000,
            retry: {
              initialRetryTime: 100,
              retries: 8,
            },
          },
          consumer: {
            groupId: 'module-consumer',
          },
        },
      },
    ]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
