import { Module } from '@nestjs/common';
import { PiggybankService } from './piggybank.service';
import { PiggybankController } from './piggybank.controller';
import { PrismaService } from '../prisma.service';
import { AiResponseService } from '../ai-response.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  controllers: [PiggybankController],
  providers: [PiggybankService, PrismaService, AiResponseService, JwtStrategy],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class PiggybankModule {} 