import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SetLimitDto } from './dto/set-limit.dto';
import { LimitType, User } from '@prisma/client';

@Injectable()
export class LimitsService {
  constructor(private prisma: PrismaService) {}

  async setLimit(dto: SetLimitDto, parentUser: User) {
    // Проверяем, что пользователь - родитель
    if (parentUser.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can set limits');
    }

    // Проверяем, что ребенок принадлежит этому родителю
    const child = await this.prisma.child.findFirst({
      where: {
        id: dto.childId,
        parentId: parentUser.id,
      },
    });

    if (!child) {
      throw new NotFoundException('Child not found or does not belong to this parent');
    }

    // Создаем или обновляем лимит
    const limit = await this.prisma.limit.upsert({
      where: {
        childId_limitType: {
          childId: dto.childId,
          limitType: dto.limitType,
        },
      },
      update: {
        monthlyLimit: dto.monthlyLimit,
        isActive: dto.isActive,
        updatedAt: new Date(),
      },
      create: {
        childId: dto.childId,
        limitType: dto.limitType,
        monthlyLimit: dto.monthlyLimit,
        isActive: dto.isActive,
        currentSpent: 0,
        resetDate: new Date(),
      },
    });

    return limit;
  }

  async getChildLimits(childId: string, parentUser: User) {
    // Проверяем, что пользователь - родитель
    if (parentUser.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can view limits');
    }

    // Проверяем, что ребенок принадлежит этому родителю
    const child = await this.prisma.child.findFirst({
      where: {
        id: childId,
        parentId: parentUser.id,
      },
      include: {
        limits: {
          orderBy: { limitType: 'asc' },
        },
      },
    });

    if (!child) {
      throw new NotFoundException('Child not found or does not belong to this parent');
    }

    return {
      childId: child.id,
      childName: child.name,
      limits: child.limits.map(limit => ({
        id: limit.id,
        limitType: limit.limitType,
        monthlyLimit: limit.monthlyLimit,
        currentSpent: limit.currentSpent,
        remainingAmount: limit.monthlyLimit - limit.currentSpent,
        isActive: limit.isActive,
        resetDate: limit.resetDate,
        createdAt: limit.createdAt,
        updatedAt: limit.updatedAt,
      })),
    };
  }

  async checkAndUpdateLimit(childId: string, limitType: LimitType, amount: number): Promise<boolean> {
    // Получаем лимит ребенка для данного типа
    const limit = await this.prisma.limit.findUnique({
      where: {
        childId_limitType: {
          childId,
          limitType,
        },
      },
    });

    // Если лимита нет или он неактивен, разрешаем транзакцию
    if (!limit || !limit.isActive) {
      return true;
    }

    // Проверяем, нужно ли сбросить месячный счетчик
    const now = new Date();
    const resetDate = new Date(limit.resetDate);
    const shouldReset = now.getMonth() !== resetDate.getMonth() || 
                       now.getFullYear() !== resetDate.getFullYear();

    let currentSpent = limit.currentSpent;
    
    // Сбрасываем счетчик если прошел месяц
    if (shouldReset) {
      currentSpent = 0;
      await this.prisma.limit.update({
        where: { id: limit.id },
        data: {
          currentSpent: 0,
          resetDate: now,
        },
      });
    }

    // Проверяем, не превысит ли новая транзакция лимит
    if (currentSpent + Math.abs(amount) > limit.monthlyLimit) {
      return false; // Лимит будет превышен
    }

    // Обновляем потраченную сумму
    await this.prisma.limit.update({
      where: { id: limit.id },
      data: {
        currentSpent: currentSpent + Math.abs(amount),
      },
    });

    return true;
  }

  async getAllChildrenLimits(parentUser: User) {
    // Проверяем, что пользователь - родитель
    if (parentUser.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can view limits');
    }

    const children = await this.prisma.child.findMany({
      where: {
        parentId: parentUser.id,
      },
      include: {
        limits: {
          orderBy: { limitType: 'asc' },
        },
      },
    });

    return children.map(child => ({
      childId: child.id,
      childName: child.name,
      balance: child.balance,
      limits: child.limits.map(limit => ({
        id: limit.id,
        limitType: limit.limitType,
        monthlyLimit: limit.monthlyLimit,
        currentSpent: limit.currentSpent,
        remainingAmount: limit.monthlyLimit - limit.currentSpent,
        isActive: limit.isActive,
        resetDate: limit.resetDate,
      })),
    }));
  }

  // Метод для определения типа лимита по категории транзакции
  getLimitTypeByCategory(category: string): LimitType | null {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('перевод') || categoryLower.includes('transfer')) {
      return 'TRANSFER';
    }
    
    if (categoryLower.includes('снятие') || categoryLower.includes('withdrawal') || categoryLower.includes('наличные') || categoryLower.includes('атм')) {
      return 'WITHDRAWAL';
    }
    
    if (categoryLower.includes('покупка') || categoryLower.includes('карта') || categoryLower.includes('purchase') || categoryLower.includes('магазин') || categoryLower.includes('оплата')) {
      return 'CARD_PURCHASE';
    }
    
    return null; // Для неопределенных категорий лимит не проверяется
  }

  async getMyLimits(user: User) {
    // Проверяем, что пользователь - ребенок
    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can view their own limits');
    }

    // Находим ребенка по имени пользователя (через профиль)
    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    });

    if (!userWithProfile?.profile) {
      throw new NotFoundException('User profile not found. Please complete your profile first.');
    }

    // Ищем ребенка по имени из профиля
    const child = await this.prisma.child.findFirst({
      where: { 
        name: userWithProfile.profile.fullName 
      },
      include: {
        limits: {
          where: { isActive: true }, // Показываем только активные лимиты
          orderBy: { limitType: 'asc' },
        },
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

    return {
      childId: child.id,
      childName: child.name,
      balance: child.balance,
      parent: child.parent,
      limits: child.limits.map(limit => ({
        id: limit.id,
        limitType: limit.limitType,
        monthlyLimit: limit.monthlyLimit,
        currentSpent: limit.currentSpent,
        remainingAmount: limit.monthlyLimit - limit.currentSpent,
        resetDate: limit.resetDate,
        createdAt: limit.createdAt,
        updatedAt: limit.updatedAt,
      })),
      totalLimits: child.limits.length,
    };
  }
} 