import {
  Body,
  Controller,
  Get,
  HttpCode,
  Injectable,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/user.decorator';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, description: 'Успешный вход' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Обновить access токен используя refresh токен' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Новые токены получены' })
  @ApiResponse({ status: 401, description: 'Неверный refresh токен' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 200, description: 'Успешная регистрация' })
  @ApiResponse({ status: 400, description: 'Пользователь уже существует' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Получить ID текущего пользователя' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'ID пользователя' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @UseGuards(JwtAuthGuard)
  @Get('me/id')
  getUserId(@CurrentUser('id') userId: string) {
    return { userId };
  }

  @ApiOperation({ summary: 'Получить всех детей родителя с их лимитами' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Список детей с их данными и лимитами',
    schema: {
      example: {
        parentId: 'uuid-parent-id',
        children: [
          {
            id: 'uuid-child-id',
            name: 'Маша Иванова',
            balance: 15000,
            missions: [],
            recentTransactions: [],
            limits: [
              {
                id: 'uuid-limit-id',
                limitType: 'TRANSFER',
                monthlyLimit: 50000,
                currentSpent: 15000,
                remainingAmount: 35000,
                isActive: true,
                resetDate: '2024-01-01T00:00:00Z'
              }
            ]
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для родителей' })
  @UseGuards(JwtAuthGuard)
  @Get('me/children')
  getParentChildren(@CurrentUser('id') userId: string) {
    return this.authService.getParentChildren(userId);
  }

  @ApiOperation({ summary: 'Получить данные текущего ребенка (только для детей)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Данные ребенка',
    schema: {
      example: {
        id: 'uuid-user-id',
        name: 'Маша Иванова',
        email: 'child@example.com',
        role: 'CHILD',
        balance: 15000,
        childId: 'uuid-child-id',
        parent: {
          id: 'uuid-parent-id',
          email: 'parent@example.com',
          profile: {
            fullName: 'Иван Иванов'
          }
        }
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для детей' })
  @ApiResponse({ status: 404, description: 'Профиль ребенка не найден' })
  @UseGuards(JwtAuthGuard)
  @Get('me/child')
  getChildProfile(@CurrentUser('id') userId: string) {
    return this.authService.getChildProfile(userId);
  }

}
