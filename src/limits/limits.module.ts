import { Module } from '@nestjs/common';
import { LimitsController } from './limits.controller';
import { LimitsService } from './limits.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LimitsController],
  providers: [LimitsService, PrismaService],
  exports: [LimitsService], // Экспортируем сервис для использования в TransactionModule
})
export class LimitsModule {} 