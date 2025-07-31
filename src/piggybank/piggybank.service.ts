import { 
  Injectable, 
  NotFoundException, 
  ForbiddenException 
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePiggybankDto } from './dto/create-piggybank.dto';
import { UpdatePiggybankDto } from './dto/update-piggybank.dto';
import { User } from '@prisma/client';
import { AiResponseService } from '../ai-response.service';

@Injectable()
export class PiggybankService {
  constructor(
    private prisma: PrismaService,
    private aiResponseService: AiResponseService,
  ) {}

  async createPiggybank(
    dto: CreatePiggybankDto,
    imagePath: string | null,
    user: User,
  ) {
    // Проверяем, что пользователь - ребенок
    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can create piggybanks');
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
    });

    if (!child) {
      throw new NotFoundException(
        'Child record not found. Please contact your parent to set up your account.'
      );
    }

    // Определяем путь к изображению
    const photoPath = imagePath || '/uploads/defaultPhoto.png';

    // Создаем копилку
    const piggybank = await this.prisma.piggyBank.create({
      data: {
        name: dto.name,
        target: dto.target,
        balance: 0, // начальный баланс
        photoPath: photoPath,
        childId: child.id,
      },
    });

    // Отправляем информацию о создании копилки в AI сервис (асинхронно)
    Promise.resolve().then(() => {
      const creationText = `Создана новая копилка "${piggybank.name}" с целью накопить ${piggybank.target/100} рублей. Начальный баланс: 0 рублей`;
      
      this.aiResponseService.updateUserResponse(user.id, {
        text: creationText,
      }, 'piggybank').catch(error => {
        console.error('AI API error:', error);
      });
    });

    return {
      id: piggybank.id,
      name: piggybank.name,
      target: piggybank.target,
      balance: piggybank.balance,
      photoPath: piggybank.photoPath,
      childId: piggybank.childId,
      childName: child.name,
      message: 'Piggybank created successfully!',
    };
  }

  async updatePiggybankBalance(
    id: string,
    dto: UpdatePiggybankDto,
    user: User,
  ) {
    // Проверяем, что пользователь - ребенок
    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can update their piggybanks');
    }

    // Находим копилку и проверяем принадлежность
    const piggybank = await this.prisma.piggyBank.findUnique({
      where: { id },
      include: { child: true },
    });

    if (!piggybank) {
      throw new NotFoundException('Piggybank not found');
    }

    // Проверяем, что копилка принадлежит этому ребенку
    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    });

    if (!userWithProfile?.profile || piggybank.child.name !== userWithProfile.profile.fullName) {
      throw new ForbiddenException('You can only update your own piggybanks');
    }

    // Вычисляем новый баланс
    const newBalance = piggybank.balance + dto.amount;

    // Проверяем, что баланс не станет отрицательным
    if (newBalance < 0) {
      throw new ForbiddenException('Insufficient balance. Cannot withdraw more than current balance.');
    }

    // Обновляем баланс копилки
    const updatedPiggybank = await this.prisma.piggyBank.update({
      where: { id },
      data: { balance: newBalance },
    });

    // Определяем тип операции
    const operationType = dto.amount > 0 ? 'deposit' : 'withdrawal';
    const message = dto.amount > 0 
      ? `Successfully deposited ${Math.abs(dto.amount)} kopecks to piggybank`
      : `Successfully withdrew ${Math.abs(dto.amount)} kopecks from piggybank`;

    // Отправляем информацию об операции с копилкой в AI сервис (асинхронно)
    Promise.resolve().then(() => {
      const operationText = dto.amount > 0 
        ? `Пополнение копилки "${updatedPiggybank.name}": +${Math.abs(dto.amount)/100} рублей. Цель: ${updatedPiggybank.target/100} рублей, накоплено: ${updatedPiggybank.balance/100} рублей`
        : `Снятие из копилки "${updatedPiggybank.name}": -${Math.abs(dto.amount)/100} рублей. Цель: ${updatedPiggybank.target/100} рублей, осталось: ${updatedPiggybank.balance/100} рублей`;
      
      this.aiResponseService.updateUserResponse(user.id, {
        text: operationText,
      }, 'piggybank').catch(error => {
        console.error('AI API error:', error);
      });
    });

    return {
      id: updatedPiggybank.id,
      name: updatedPiggybank.name,
      target: updatedPiggybank.target,
      previousBalance: piggybank.balance,
      newBalance: updatedPiggybank.balance,
      amount: dto.amount,
      operationType,
      photoPath: updatedPiggybank.photoPath,
      childId: updatedPiggybank.childId,
      message,
    };
  }

  async deletePiggybank(id: string, user: User) {
    // Проверяем, что пользователь - ребенок
    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can delete their piggybanks');
    }

    // Находим копилку и проверяем принадлежность
    const piggybank = await this.prisma.piggyBank.findUnique({
      where: { id },
      include: { child: true },
    });

    if (!piggybank) {
      throw new NotFoundException('Piggybank not found');
    }

    // Проверяем, что копилка принадлежит этому ребенку
    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    });

    if (!userWithProfile?.profile || piggybank.child.name !== userWithProfile.profile.fullName) {
      throw new ForbiddenException('You can only delete your own piggybanks');
    }

    // Удаляем копилку
    await this.prisma.piggyBank.delete({
      where: { id },
    });

    return {
      message: 'Piggybank deleted successfully!',
      deletedId: id,
    };
  }

  async getMyPiggybanks(user: User) {
    // Проверяем, что пользователь - ребенок
    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can access their piggybanks');
    }

    // Находим ребенка по имени пользователя
    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    });

    if (!userWithProfile?.profile) {
      throw new NotFoundException('User profile not found');
    }

    const child = await this.prisma.child.findFirst({
      where: { name: userWithProfile.profile.fullName },
      include: {
        piggyBanks: {
          orderBy: { id: 'desc' },
        },
      },
    });

    if (!child) {
      throw new NotFoundException('Child record not found');
    }

    return {
      childId: child.id,
      childName: child.name,
      piggybanks: child.piggyBanks,
      totalPiggybanks: child.piggyBanks.length,
    };
  }

  async getChildrenPiggybanks(user: User) {
    // Проверяем, что пользователь - родитель
    if (user.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can access children piggybanks');
    }

    // Получаем всех детей родителя с их копилками
    const children = await this.prisma.child.findMany({
      where: { parentId: user.id },
      include: {
        piggyBanks: {
          orderBy: { id: 'desc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    return {
      parentId: user.id,
      children: children.map(child => ({
        childId: child.id,
        childName: child.name,
        balance: child.balance,
        piggybanks: child.piggyBanks,
        totalPiggybanks: child.piggyBanks.length,
      })),
      totalChildren: children.length,
    };
  }
}