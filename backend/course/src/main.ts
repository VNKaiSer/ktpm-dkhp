import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );
  await app.listen();
}
bootstrap();
