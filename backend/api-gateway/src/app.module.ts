import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppService } from './services/app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { JwtService } from '@nestjs/jwt';
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
      },
    ]),
    CacheModule.registerAsync({
      useFactory: async () => ({
        redis: {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT
        }
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AppService, JwtService],
})
export class AppModule { }
