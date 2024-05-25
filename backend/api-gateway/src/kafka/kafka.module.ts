import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { KafkaProducerService } from './kafka-producer.service';
// import { Partitioners } from '@nestjs/microservices/external/kafka.interface';
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async () => ({
                redis: {
                    store: redisStore,
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT
                }
            }),
        }),
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'api-gateway',
                        brokers: ['103.72.99.224:9092'],
                        retry: {
                            retries: 5, // Số lần thử lại khi gặp lỗi
                            initialRetryTime: 300, // Thời gian chờ ban đầu trước khi thử lại (ms)
                        },
                    },
                    consumer: {
                        groupId: 'cache-group-id',
                    },
                    // producer: {
                    //     createPartitioner: Partitioners.LegacyPartitioner,
                    // },
                },
            },
        ]),
    ],
    providers: [KafkaProducerService],
    exports: [KafkaProducerService],
})
export class KafkaModule { }
