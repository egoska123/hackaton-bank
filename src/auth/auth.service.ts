import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { RegisterDto } from './dto/register.dto';
import { LimitsService } from '../limits/limits.service';
import { AiResponseService } from '../ai-response.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private limitsService: LimitsService,
    private aiResponseService: AiResponseService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    if (!user) throw new NotFoundException('User not found'); // нужно добавить проверку

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

 async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Ветка: регистрация РОДИТЕЛЯ
    if (dto.role === 'PARENT') {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: await hash(dto.password),
          role: dto.role,
          profile: {
            create: {
              fullName: dto.name,
            },
          },
        },
      });

      const tokens = await this.issueTokens(user.id);

      return {
        user: await this.returnUserFields(user),
        ...tokens,
      };
    }

    // Ветка: регистрация РЕБЁНКА
    if (dto.role === 'CHILD') {
      if (!dto.parentId) {
        throw new BadRequestException('Parent ID is required for child registration');
      }

      const parent = await this.prisma.user.findUnique({
        where: { id: dto.parentId },
      });

      if (!parent || parent.role !== 'PARENT') {
        throw new BadRequestException('Invalid parent ID');
      }

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: await hash(dto.password),
          role: dto.role,
          profile: {
            create: {
              fullName: dto.name,
            },
          },
        },
      });

      await this.prisma.child.create({
        data: {
          name: dto.name,
          parentId: parent.id,
        },
      });

      const tokens = await this.issueTokens(user.id);

      return {
        user: this.returnUserFields(user),
        ...tokens,
      };
    }

    // На случай некорректной роли
    throw new BadRequestException('Unsupported role');
  }


  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async returnUserFields(user: User) {
    const fullUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    });

    if (!fullUser) {
      throw new NotFoundException('User not found');
    }

    return {
      name: fullUser.profile?.fullName ?? 'Без имени',
      email: fullUser.email,
      role: fullUser.role,
    };
  }



  async getParentChildren(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        children: {
          include: {
            missions: true,
            transactions: {
              orderBy: { createdAt: 'desc' },
              take: 5, // последние 5 транзакций для каждого ребенка
            },
            limits: {
              orderBy: { limitType: 'asc' },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can access children data');
    }

    return {
      parentId: user.id,
      children: user.children?.map(child => ({
        id: child.id,
        name: child.name,
        balance: child.balance,
        missions: child.missions,
        recentTransactions: child.transactions,
        limits: child.limits?.map(limit => ({
          id: limit.id,
          limitType: limit.limitType,
          monthlyLimit: limit.monthlyLimit,
          currentSpent: limit.currentSpent,
          remainingAmount: limit.monthlyLimit - limit.currentSpent,
          isActive: limit.isActive,
          resetDate: limit.resetDate,
        })) || [],
      })) || [],
    };
  }

  async getChildProfile(userId: string) {
    // Получаем пользователя с профилем
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can access this endpoint');
    }

    if (!user.profile) {
      throw new NotFoundException('User profile not found. Please complete your profile first.');
    }

    // Ищем запись ребенка по имени из профиля
    const child = await this.prisma.child.findFirst({
      where: { 
        name: user.profile.fullName 
      },
      include: {
        parent: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });

    if (!child) {
      throw new NotFoundException('Child record not found. Please contact your parent to set up your account.');
    }

    // Отправляем информацию о профиле ребенка в AI сервис (асинхронно)
    Promise.resolve().then(() => {
      const profileText = `Профиль ребенка: ${user.profile!.fullName}, текущий баланс: ${child.balance/100} рублей, родитель: ${child.parent.profile?.fullName || child.parent.email}`;
      
      this.aiResponseService.updateUserResponse(user.id, {
        text: profileText,
      }, 'profile').catch(error => {
        console.error('AI API error:', error);
      });
    });

    return {
      id: user.id,
      name: user.profile.fullName,
      email: user.email,
      role: user.role,
      balance: child.balance,
      childId: child.id,
      parent: child.parent,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
