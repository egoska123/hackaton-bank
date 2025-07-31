import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Get,
  Param,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiBody,
  ApiParam 
} from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

@ApiTags('transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Создать новую транзакцию' })
  @ApiBody({ type: TransactionDto })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 201, 
    description: 'Транзакция успешно создана',
    schema: {
      example: {
        id: 'uuid-transaction-id',
        childId: 'uuid-child-id',
        amount: 1000,
        category: 'карманные деньги',
        description: 'Награда за хорошие оценки',
        createdAt: '2024-01-15T10:30:00Z'
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для детей' })
  @ApiResponse({ status: 404, description: 'Профиль ребенка не найден' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  async createTransaction(
    @Body() dto: TransactionDto,
    @CurrentUser() user: User,
  ) {
    return this.transactionService.createTransaction(dto, user);
  }

  @ApiOperation({ summary: 'Получить все транзакции ребенка' })
  @ApiParam({ name: 'childId', description: 'ID ребенка' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Список транзакций ребенка',
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
        transactions: [
          {
            id: 'uuid-transaction-id',
            amount: 1000,
            category: 'карманные деньги',
            description: 'Награда за хорошие оценки',
            createdAt: '2024-01-15T10:30:00Z'
          }
        ],
        totalTransactions: 1
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Ребенок не найден' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('child/:childId')
  async getChildTransactions(@Param('childId') childId: string) {
    return this.transactionService.getChildTransactions(childId);
  }

  @ApiOperation({ summary: 'Получить мою историю транзакций (только для детей)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'История транзакций текущего ребенка',
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
        transactions: [
          {
            id: 'uuid-transaction-id',
            amount: 1000,
            category: 'карманные деньги',
            description: 'Награда за хорошие оценки',
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 'uuid-transaction-id-2',
            amount: -500,
            category: 'развлечения',
            description: 'Кино с друзьями',
            createdAt: '2024-01-14T15:20:00Z'
          }
        ],
        totalTransactions: 2
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для детей' })
  @ApiResponse({ status: 404, description: 'Профиль ребенка не найден' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('my-history')
  async getMyTransactions(@CurrentUser() user: User) {
    return this.transactionService.getMyTransactions(user);
  }
}
