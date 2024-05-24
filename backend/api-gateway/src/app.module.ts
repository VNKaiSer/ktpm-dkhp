import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppService } from './services/app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, 'protos/users.proto'),
          url: process.env.SERVER_AUTH_URL,
        },
      }
    ]),

  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule { }
