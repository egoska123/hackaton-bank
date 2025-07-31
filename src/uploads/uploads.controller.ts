import {
  Controller,
  Get,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam 
} from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  
  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    
    // Проверяем, существует ли файл
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    
    // Отправляем файл
    return res.sendFile(filePath);
  }
  
  @Get('info/:filename')
  async getFileInfo(@Param('filename') filename: string) {
    const filePath = join(process.cwd(), 'uploads', filename);
    
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    
    return {
      filename,
      path: `/uploads/${filename}`,
      exists: true,
    };
  }
} 