import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppService } from './services/app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { JwtService } from '@nestjs/jwt';
import { CourseController } from './controllers/course.controller';
import { KafkaModule } from './kafka/kafka.module';
import type { RedisClientOptions } from 'redis';
@Module({
  imports: [
    KafkaModule,
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
    ClientsModule.register([
      {
        name: 'COURSE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'course',
          protoPath: join(__dirname, 'protos/course.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),

  ],
  controllers: [AuthController, CourseController],
  providers: [AppService, JwtService],
})
export class AppModule { }
