import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLimitsDto {
  @ApiProperty({ 
    example: 'uuid-child-id', 
    description: 'ID ребенка для получения его лимитов' 
  })
  @IsUUID()
  childId: string;
} 