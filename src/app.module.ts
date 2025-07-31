import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { PiggybankModule } from './piggybank/piggybank.module';
import { MissionsModule } from './missions/missions.module';
import { UploadsModule } from './uploads/uploads.module';
import { LimitsModule } from './limits/limits.module';
import { WebSocketModule } from './websocket/websocket.module';
import { AiResponseService } from './ai-response.service';
import { AdviceWebSocketGateway } from './websocket/websocket.gateway';
import { PrismaService } from './prisma.service';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [AuthModule, TransactionModule, PiggybankModule, MissionsModule, UploadsModule, LimitsModule, WebSocketModule],
  controllers: [AppController],
  providers: [AppService, AiResponseService, PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    // Связываем AI сервис с WebSocket Gateway
    const aiResponseService = this.moduleRef.get(AiResponseService, { strict: false });
    const webSocketGateway = this.moduleRef.get(AdviceWebSocketGateway, { strict: false });
    
    if (aiResponseService && webSocketGateway) {
      aiResponseService.setWebSocketGateway(webSocketGateway);
    }
  }
}
