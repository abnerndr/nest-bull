/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TEST_QUEUE } from './contants';
import { TestProcessor } from './processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_KEY1'),
        },
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueue({ name: TEST_QUEUE })
  ],
  providers: [AppService, TestProcessor],
  controllers: [AppController],
})
export class AppModule { }
