import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiConsumes,
  ApiBody,
  ApiParam 
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PiggybankService } from './piggybank.service';
import { CreatePiggybankDto } from './dto/create-piggybank.dto';
import { UpdatePiggybankDto } from './dto/update-piggybank.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@ApiTags('piggybank')
@Controller('piggybank')
export class PiggybankController {
  constructor(private readonly piggybankService: PiggybankService) {}

  @ApiOperation({ summary: 'Создать копилку с изображением' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'На велосипед' },
        target: { type: 'integer', example: 50000 },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Копилка успешно создана' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(201)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `piggybank-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(
            new BadRequestException('Only image files (jpg, jpeg, png, gif, webp) are allowed!'),
            false
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async createPiggybank(
    @Body() dto: CreatePiggybankDto,
    @UploadedFile() image: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    const imagePath = image ? `/uploads/${image.filename}` : null;
    return this.piggybankService.createPiggybank(dto, imagePath, user);
  }

  @ApiOperation({ summary: 'Изменить баланс копилки (пополнение/снятие)' })
  @ApiParam({ name: 'id', description: 'ID копилки' })
  @ApiBody({ type: UpdatePiggybankDto })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Баланс успешно изменен' })
  @ApiResponse({ status: 403, description: 'Недостаточно средств или доступ запрещен' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @Put(':id/balance')
  async updatePiggybankBalance(
    @Param('id') id: string,
    @Body() dto: UpdatePiggybankDto,
    @CurrentUser() user: User,
  ) {
    return this.piggybankService.updatePiggybankBalance(id, dto, user);
  }

  @ApiOperation({ summary: 'Удалить копилку' })
  @ApiParam({ name: 'id', description: 'ID копилки' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Копилка успешно удалена' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 404, description: 'Копилка не найдена' })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete(':id')
  async deletePiggybank(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.piggybankService.deletePiggybank(id, user);
  }

  @ApiOperation({ summary: 'Получить мои копилки (для ребенка)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Список копилок ребенка',
    schema: {
      example: {
        childId: 'uuid-child-id',
        childName: 'Маша Иванова',
        piggybanks: [
          {
            id: 'uuid-piggybank-id',
            name: 'На велосипед',
            target: 50000,
            balance: 15000,
            photoPath: '/uploads/piggybank-123.jpg'
          }
        ],
        totalPiggybanks: 1
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для детей' })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('my')
  async getMyPiggybanks(@CurrentUser() user: User) {
    return this.piggybankService.getMyPiggybanks(user);
  }

  @ApiOperation({ summary: 'Получить копилки всех детей (для родителя)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 200, 
    description: 'Список копилок всех детей родителя',
    schema: {
      example: {
        parentId: 'uuid-parent-id',
        children: [
          {
            childId: 'uuid-child-id',
            childName: 'Маша Иванова',
            balance: 15000,
            piggybanks: [
              {
                id: 'uuid-piggybank-id',
                name: 'На велосипед',
                target: 50000,
                balance: 15000,
                photoPath: '/uploads/piggybank-123.jpg'
              }
            ],
            totalPiggybanks: 1
          }
        ],
        totalChildren: 1
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для родителей' })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('children')
  async getChildrenPiggybanks(@CurrentUser() user: User) {
    return this.piggybankService.getChildrenPiggybanks(user);
  }
} 