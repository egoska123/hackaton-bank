import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/jwt.strategy';
import { LimitsModule } from '../limits/limits.module';
import { AiResponseService } from '../ai-response.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, JwtStrategy, AiResponseService],
  imports: [
    ConfigModule,
    LimitsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class TransactionModule {}
