import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'generated/prisma';

export class RegisterDto {
  @ApiProperty({ 
    example: 'Иван Иванов', 
    description: 'Полное имя пользователя' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: 'parent@example.com', 
    description: 'Email пользователя для входа в систему' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'securePassword123', 
    description: 'Пароль пользователя (минимум 6 символов)',
    minLength: 6 
  })
  @MinLength(6)
  @IsString()
  password: string;

  @ApiProperty({ 
    enum: Role,
    example: 'PARENT',
    description: 'Роль пользователя: PARENT (родитель) или CHILD (ребенок)' 
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ 
    example: 'uuid-parent-id', 
    description: 'ID родителя (обязательно для роли CHILD)',
    required: false 
  })
  @IsOptional()
  @IsString()
  parentId?: string; // 👈 обязательно для детей
}
