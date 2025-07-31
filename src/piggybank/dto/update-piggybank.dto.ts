import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePiggybankDto {
  @ApiProperty({ 
    example: 1000, 
    description: 'Сумма для изменения баланса в копейках (положительное - пополнение, отрицательное - снятие)' 
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsNotEmpty()
  amount: number; // сумма для изменения баланса (положительное - пополнение, отрицательное - снятие)
} 