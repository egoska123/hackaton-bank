import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({ 
    example: 1000, 
    description: 'Сумма транзакции в копейках (положительное — пополнение, отрицательное — трата)' 
  })
  @IsInt()
  amount: number; // положительное — пополнение, отрицательное — трата

  @ApiProperty({ 
    example: 'карманные деньги', 
    description: 'Категория транзакции' 
  })
  @IsString()
  category: string;

  @ApiProperty({ 
    example: 'Награда за хорошие оценки', 
    description: 'Описание транзакции (необязательно)',
    required: false 
  })
  @IsOptional()
  @IsString()
  description?: string;
}
