import { IsEnum, IsInt, IsUUID, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LimitType } from '@prisma/client';

export class SetLimitDto {
  @ApiProperty({ 
    example: 'uuid-child-id', 
    description: 'ID ребенка для которого устанавливается лимит' 
  })
  @IsUUID()
  childId: string;

  @ApiProperty({ 
    enum: LimitType,
    example: 'TRANSFER', 
    description: 'Тип лимита: TRANSFER (переводы), WITHDRAWAL (снятие), CARD_PURCHASE (покупки с карты)' 
  })
  @IsEnum(LimitType)
  limitType: LimitType;

  @ApiProperty({ 
    example: 50000, 
    description: 'Месячный лимит в копейках (например, 50000 = 500 рублей)' 
  })
  @IsInt()
  @Min(0)
  monthlyLimit: number;

  @ApiProperty({ 
    example: true, 
    description: 'Активен ли лимит',
    default: true
  })
  @IsBoolean()
  isActive: boolean = true;
} 