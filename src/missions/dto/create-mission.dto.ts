import { IsString, IsNotEmpty, IsInt, Min, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReportType } from '@prisma/client';

export class CreateMissionDto {
  @ApiProperty({ 
    example: 'uuid-child-id', 
    description: 'ID ребенка, которому дается задание' 
  })
  @IsUUID()
  @IsNotEmpty()
  childId: string; // ID ребенка, которому дается задание

  @ApiProperty({ 
    example: 'Убрать комнату', 
    description: 'Название задания' 
  })
  @IsString()
  @IsNotEmpty()
  title: string; // название задания

  @ApiProperty({ 
    example: 'Навести порядок в своей комнате и протереть пыль', 
    description: 'Подробное описание задания (необязательно)',
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string; // описание задания

  @ApiProperty({ 
    example: 500, 
    description: 'Вознаграждение за выполнение задания в копейках',
    minimum: 1 
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  reward: number; // вознаграждение в копейках

  @ApiProperty({ 
    enum: ReportType,
    example: 'PHOTO',
    description: 'Тип отчета: TEXT (текстовый) или PHOTO (фото)' 
  })
  @IsEnum(ReportType)
  reportType: ReportType; // тип отчета: TEXT или PHOTO
} 