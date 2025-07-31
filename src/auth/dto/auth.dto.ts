import { IsEmail, IsEnum, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'generated/prisma';

export class AuthDto {

  @ApiProperty({ 
    example: 'user@example.com', 
    description: 'Email пользователя' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Пароль пользователя (минимум 6 символов)',
    minLength: 6 
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string;

  @ApiProperty({ 
    enum: Role,
    example: 'PARENT',
    description: 'Роль пользователя' 
  })
  @IsEnum(Role, {message: 'Role must be either PARENT or CHILD'})
  role: Role
}
