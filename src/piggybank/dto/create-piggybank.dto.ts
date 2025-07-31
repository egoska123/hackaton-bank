import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePiggybankDto {
  @ApiProperty({ 
    example: 'На велосипед', 
    description: 'Название цели накопления' 
  })
  @IsString()
  @IsNotEmpty()
  name: string; // название цели (на что копит)

  @ApiProperty({ 
    example: 50000, 
    description: 'Целевая сумма для накопления в копейках',
    minimum: 1 
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  target: number; // сумма для накопления в копейках
} 