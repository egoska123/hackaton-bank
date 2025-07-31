import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  user?: any;
}

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AdviceWebSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AdviceWebSocketGateway');
  private connectedClients = new Map<string, AuthenticatedSocket>();

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      this.logger.log(`=== New connection attempt: ${client.id} ===`);
      
      // Получаем токен из разных мест
      let token = client.handshake.auth?.token || 
                  client.handshake.query?.token ||
                  client.handshake.headers?.authorization;

      this.logger.log(`Raw token sources:`);
      this.logger.log(`- auth: ${client.handshake.auth?.token ? 'present' : 'missing'}`);
      this.logger.log(`- query: ${client.handshake.query?.token ? 'present' : 'missing'}`);
      this.logger.log(`- headers.authorization: ${client.handshake.headers?.authorization ? 'present' : 'missing'}`);
      this.logger.log(`Selected token: ${token ? 'present' : 'missing'}`);

      // Если токен приходит как "Bearer TOKEN", извлекаем токен
      if (typeof token === 'string' && token.startsWith('Bearer ')) {
        this.logger.log(`Removing 'Bearer ' prefix from token`);
        token = token.substring(7);
      }
      
      this.logger.log(`Client ${client.id} attempting connection with token: ${token ? token.substring(0, 20) + '...' : 'missing'}`);
      
      if (!token) {
        this.logger.warn(`Client ${client.id} disconnected: No token provided`);
        client.emit('auth_error', { error: 'No token provided' });
        client.disconnect();
        return;
      }

      this.logger.log(`Verifying token for client ${client.id}...`);
      
      try {
        const decoded = await this.jwtService.verifyAsync(token);
        this.logger.log(`Token decoded successfully: ${JSON.stringify(decoded)}`);
        
        // Проверяем разные поля для userId (в нашем приложении используется 'id')
        const userId = decoded.id || decoded.sub || decoded.userId;
        this.logger.log(`Extracted userId: ${userId}`);
        
        if (!userId) {
          this.logger.error(`No userId found in JWT token. Available fields: ${Object.keys(decoded).join(', ')}`);
          client.emit('auth_error', { error: 'Invalid token structure', details: 'No userId field found' });
          client.disconnect();
          return;
        }
        
        this.logger.log(`Token verified for client ${client.id}, user: ${userId}`);
        
        const user = await this.prismaService.user.findUnique({
          where: { id: userId },
          include: { profile: true },
        });

        if (!user) {
          this.logger.warn(`Client ${client.id} disconnected: User not found for ID: ${userId}`);
          client.emit('auth_error', { error: 'User not found' });
          client.disconnect();
          return;
        }

        client.userId = user.id;
        client.user = user;
        this.connectedClients.set(user.id, client);

        this.logger.log(`✅ Client ${client.id} successfully connected as user ${user.email} (${user.id})`);
        
        // Отправляем подтверждение подключения
        client.emit('connected', {
          message: 'Successfully connected to advice updates',
          userId: user.id,
          userEmail: user.email,
        });

      } catch (jwtError) {
        this.logger.error(`JWT verification failed for client ${client.id}:`);
        this.logger.error(`Error: ${jwtError.message}`);
        this.logger.error(`Token: ${token.substring(0, 50)}...`);
        client.emit('auth_error', { error: 'Invalid token', details: jwtError.message });
        client.disconnect();
        return;
      }

    } catch (error) {
      this.logger.error(`Unexpected error in handleConnection for client ${client.id}:`);
      this.logger.error(`Error: ${error.message}`);
      this.logger.error(`Stack: ${error.stack}`);
      client.emit('auth_error', { error: 'Server error', details: error.message });
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      this.connectedClients.delete(client.userId);
      this.logger.log(`Client ${client.id} (user ${client.userId}) disconnected`);
    }
  }

  // Метод для отправки совета конкретному пользователю
  sendAdviceToUser(userId: string, advice: string) {
    const client = this.connectedClients.get(userId);
    if (client) {
      client.emit('new_advice', {
        advice,
        timestamp: new Date().toISOString(),
      });
      this.logger.log(`Advice sent to user ${userId}`);
      return true;
    }
    this.logger.warn(`User ${userId} not connected, advice not sent`);
    return false;
  }

  // Метод для получения всех подключенных пользователей
  getConnectedUsers(): string[] {
    return Array.from(this.connectedClients.keys());
  }

  @SubscribeMessage('ping')
  handlePing(client: AuthenticatedSocket): void {
    client.emit('pong', { message: 'pong', timestamp: new Date().toISOString() });
  }
} 