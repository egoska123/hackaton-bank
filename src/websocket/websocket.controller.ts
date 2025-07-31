import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AdviceWebSocketGateway } from './websocket.gateway';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

class TestAdviceDto {
  advice: string;
  targetUserId?: string;
}

@ApiTags('websocket')
@Controller('websocket')
export class WebSocketController {
  constructor(private webSocketGateway: AdviceWebSocketGateway) {}

  @ApiOperation({ summary: 'Отправить тестовый совет пользователю' })
  @ApiBody({ type: TestAdviceDto })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Совет отправлен' })
  @ApiResponse({ status: 404, description: 'Пользователь не подключен' })
  @UseGuards(AuthGuard('jwt'))
  @Post('send-test-advice')
  async sendTestAdvice(
    @Body() dto: TestAdviceDto,
    @CurrentUser() user: User,
  ) {
    const targetUserId = dto.targetUserId || user.id;
    const sent = this.webSocketGateway.sendAdviceToUser(targetUserId, dto.advice);
    
    return {
      success: sent,
      message: sent ? 'Advice sent successfully' : 'User not connected',
      targetUserId,
      advice: dto.advice,
    };
  }

  @ApiOperation({ summary: 'Получить список подключенных пользователей' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Список подключенных пользователей' })
  @UseGuards(AuthGuard('jwt'))
  @Get('connected-users')
  async getConnectedUsers() {
    return {
      connectedUsers: this.webSocketGateway.getConnectedUsers(),
      totalConnected: this.webSocketGateway.getConnectedUsers().length,
    };
  }

  @ApiOperation({ summary: 'Проверить валидность JWT токена' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Токен валиден' })
  @UseGuards(AuthGuard('jwt'))
  @Get('check-token')
  async checkToken(@CurrentUser() user: User) {
    return {
      valid: true,
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
} 