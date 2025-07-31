import {
  Body,
  Controller,
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
import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { SubmitReportDto } from './dto/submit-report.dto';
import { ApproveMissionDto } from './dto/approve-mission.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@ApiTags('missions')
@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  // Родитель создает задание для ребенка
  @ApiOperation({ summary: 'Создать новое задание для ребенка (родитель)' })
  @ApiBody({ type: CreateMissionDto })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ 
    status: 201, 
    description: 'Задание успешно создано',
    schema: {
      example: {
        id: 'uuid-mission-id',
        title: 'Убрать комнату',
        description: 'Навести порядок в своей комнате',
        reward: 500,
        reportType: 'PHOTO',
        status: 'PENDING',
        childName: 'Маша Иванова',
        createdAt: '2024-01-15T10:30:00Z',
        message: 'Mission created successfully!'
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Доступ только для родителей' })
  @ApiResponse({ status: 404, description: 'Ребенок не найден' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(201)
  @Post()
  async createMission(
    @Body() dto: CreateMissionDto,
    @CurrentUser() user: User,
  ) {
    return this.missionsService.createMission(dto, user);
  }

  // Ребенок отправляет отчет (текст или фото)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @Post(':id/report')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `mission-report-${uniqueSuffix}${ext}`;
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
        fileSize: 10 * 1024 * 1024, // 10MB для фото отчетов
      },
    }),
  )
  async submitReport(
    @Param('id') missionId: string,
    @Body() dto: SubmitReportDto,
    @UploadedFile() photo: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    const photoPath = photo ? `/uploads/${photo.filename}` : null;
    return this.missionsService.submitReport(missionId, dto, photoPath, user);
  }

  // Родитель подтверждает или отклоняет выполнение задания
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @Put(':id/approve')
  async approveMission(
    @Param('id') missionId: string,
    @Body() dto: ApproveMissionDto,
    @CurrentUser() user: User,
  ) {
    return this.missionsService.approveMission(missionId, dto, user);
  }

  // Получение заданий для ребенка
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('my')
  async getChildMissions(@CurrentUser() user: User) {
    return this.missionsService.getChildMissions(user);
  }

  // Получение всех заданий для родителя
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('parent')
  async getParentMissions(@CurrentUser() user: User) {
    return this.missionsService.getParentMissions(user);
  }
} 