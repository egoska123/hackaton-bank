import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdviceWebSocketGateway } from './websocket.gateway';
import { WebSocketController } from './websocket.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [WebSocketController],
  providers: [AdviceWebSocketGateway, PrismaService],
  exports: [AdviceWebSocketGateway],
})
export class WebSocketModule {} 