import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'cache-client-id',
          brokers: ['103.72.99.224:9092'],
        },
        consumer: {
          groupId: 'cache-group-id',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
