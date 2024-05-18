import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }