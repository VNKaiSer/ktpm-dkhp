import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'course',
      protoPath: join(__dirname, 'proto/course.proto'),
      url: process.env.GRPC_URL,
    },
  });
  await app.startAllMicroservices();
  await app.listen(6000);
}
bootstrap();
