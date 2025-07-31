import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiBody,
  ApiParam 
} from '@nestjs/swagger';
import { LimitsService } from './limits.service';
import { SetLimitDto } from './dto/set-limit.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

@ApiTags('limits')
@Controller('limits')
export class LimitsController {
  constructor(private readonly limitsService: LimitsService) {}

  @ApiOperation({ summary: 'Установить лимит для ребенка (только для родителей)' })
  @ApiBody({ type: SetLimitDto })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 201, 
    description: 'Лимит успешно установлен',
    schema: {
      example: {
        id: 'uuid-limit-id',
        childId: 'uuid-child-id',
        limitType: 'TRANSFER',
        monthlyLimit: 50000,
        currentSpent: 0,
        isActive: true,
        resetDate: '2024-01-01T00:00:00Z',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для родителей' })
  @ApiResponse({ status: 404, description: 'Ребенок не найден или не принадлежит родителю' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('set')
  async setLimit(
    @Body() dto: SetLimitDto,
    @CurrentUser() user: User,
  ) {
    return this.limitsService.setLimit(dto, user);
  }

  @ApiOperation({ summary: 'Получить лимиты конкретного ребенка (только для родителей)' })
  @ApiParam({ name: 'childId', description: 'ID ребенка' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Лимиты ребенка',
    schema: {
      example: {
        childId: 'uuid-child-id',
        childName: 'Маша Иванова',
        limits: [
          {
            id: 'uuid-limit-id',
            limitType: 'TRANSFER',
            monthlyLimit: 50000,
            currentSpent: 15000,
            remainingAmount: 35000,
            isActive: true,
            resetDate: '2024-01-01T00:00:00Z',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для родителей' })
  @ApiResponse({ status: 404, description: 'Ребенок не найден или не принадлежит родителю' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('child/:childId')
  async getChildLimits(
    @Param('childId') childId: string,
    @CurrentUser() user: User,
  ) {
    return this.limitsService.getChildLimits(childId, user);
  }

  @ApiOperation({ summary: 'Получить лимиты всех детей родителя (только для родителей)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Лимиты всех детей родителя',
    schema: {
      example: [
        {
          childId: 'uuid-child-id-1',
          childName: 'Маша Иванова',
          balance: 15000,
          limits: [
            {
              id: 'uuid-limit-id-1',
              limitType: 'TRANSFER',
              monthlyLimit: 50000,
              currentSpent: 15000,
              remainingAmount: 35000,
              isActive: true,
              resetDate: '2024-01-01T00:00:00Z'
            }
          ]
        },
        {
          childId: 'uuid-child-id-2',
          childName: 'Петя Иванов',
          balance: 25000,
          limits: [
            {
              id: 'uuid-limit-id-2',
              limitType: 'CARD_PURCHASE',
              monthlyLimit: 30000,
              currentSpent: 10000,
              remainingAmount: 20000,
              isActive: true,
              resetDate: '2024-01-01T00:00:00Z'
            }
          ]
        }
      ]
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для родителей' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('all')
  async getAllChildrenLimits(@CurrentUser() user: User) {
    return this.limitsService.getAllChildrenLimits(user);
  }

  @ApiOperation({ summary: 'Получить мои лимиты (только для детей)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Лимиты текущего ребенка',
    schema: {
      example: {
        childId: 'uuid-child-id',
        childName: 'Маша Иванова',
        balance: 15000,
        parent: {
          id: 'uuid-parent-id',
          email: 'parent@example.com',
          profile: {
            fullName: 'Иван Иванов'
          }
        },
        limits: [
          {
            id: 'uuid-limit-id-1',
            limitType: 'TRANSFER',
            monthlyLimit: 50000,
            currentSpent: 15000,
            remainingAmount: 35000,
            resetDate: '2024-01-01T00:00:00Z',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 'uuid-limit-id-2',
            limitType: 'CARD_PURCHASE',
            monthlyLimit: 30000,
            currentSpent: 10000,
            remainingAmount: 20000,
            resetDate: '2024-01-01T00:00:00Z',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          }
        ],
        totalLimits: 2
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для детей' })
  @ApiResponse({ status: 404, description: 'Профиль ребенка не найден' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('my-limits')
  async getMyLimits(@CurrentUser() user: User) {
    return this.limitsService.getMyLimits(user);
  }
} 