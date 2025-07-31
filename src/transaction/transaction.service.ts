import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { Transaction, User } from '@prisma/client';
import { TransactionDto } from './dto/transaction.dto';
import { LimitsService } from '../limits/limits.service';
import { AiResponseService } from 'src/ai-response.service';

@Injectable()
export class TransactionService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private limitsService: LimitsService,
        private aiResponseService: AiResponseService,
    ) {}

    async createTransaction(dto: TransactionDto, user: User): Promise<Transaction> {
        // Проверяем, что пользователь - ребенок
        if (user.role !== 'CHILD') {
            throw new Error('Only children can create transactions');
        }

        // Находим ребенка по имени пользователя (через профиль)
        const userWithProfile = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: { profile: true },
        });

        if (!userWithProfile?.profile) {
            throw new Error('User profile not found. Please complete your profile first.');
        }

        // Ищем ребенка по имени из профиля
        const child = await this.prisma.child.findFirst({
            where: { 
                name: userWithProfile.profile.fullName 
            },
        });

        if (!child) {
            throw new Error('Child record not found. Please contact your parent to set up your account.');
        }

        // 2. Проверить лимиты только для отрицательных транзакций (трат)
        if (dto.amount < 0) {
            const limitType = this.limitsService.getLimitTypeByCategory(dto.category);
            if (limitType) {
                const isAllowed = await this.limitsService.checkAndUpdateLimit(
                    child.id, 
                    limitType, 
                    dto.amount
                );
                
                if (!isAllowed) {
                    throw new BadRequestException(
                        `Превышен месячный лимит для категории "${dto.category}". Обратитесь к родителю для увеличения лимита.`
                    );
                }
            }
        }

        // 3. Создать транзакцию и обновить баланс
        const transaction = await this.prisma.transaction.create({
            data: {
                amount: dto.amount,
                category: dto.category,
                description: dto.description,
                childId: child.id,
            },
        });

        // 4. Обновить баланс ребенка
        await this.prisma.child.update({
            where: { id: child.id },
            data: {
                balance: child.balance + dto.amount,
            },
        });

        // 5. Создать запрос ии агенту (асинхронно, не блокируя транзакцию)
        Promise.resolve().then(() => {
            this.aiResponseService.updateUserResponse(user.id, {
                text: `Транзакция: ${(dto.amount) / 100} рублей в категории ${dto.category}, описание: ${dto.description}`,
            }, 'transaction').catch(error => {
                console.error('AI API error:', error);
            });
        });

        return transaction;
    }

    async getChildTransactions(childId: string) {
        const child = await this.prisma.child.findUnique({
            where: { id: childId },
            include: {
                transactions: {
                    orderBy: { createdAt: 'desc' },
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
            throw new Error('Child not found');
        }

        return {
            childId: child.id,
            childName: child.name,
            balance: child.balance,
            parent: child.parent,
            transactions: child.transactions,
            totalTransactions: child.transactions.length,
        };
    }

    async getMyTransactions(user: User) {
        // Проверяем, что пользователь - ребенок
        if (user.role !== 'CHILD') {
            throw new Error('Only children can view their own transactions');
        }

        // Находим ребенка по имени пользователя (через профиль)
        const userWithProfile = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: { profile: true },
        });

        if (!userWithProfile?.profile) {
            throw new Error('User profile not found. Please complete your profile first.');
        }

        // Ищем ребенка по имени из профиля
        const child = await this.prisma.child.findFirst({
            where: { 
                name: userWithProfile.profile.fullName 
            },
            include: {
                transactions: {
                    orderBy: { createdAt: 'desc' },
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
            throw new Error('Child record not found. Please contact your parent to set up your account.');
        }

        // 5. Создать запрос ии агенту (асинхронно, не блокируя основное)
        Promise.resolve().then(() => {
            this.aiResponseService.updateUserResponse(user.id, {
                text: `История платежей: ${this.makeprompt(child.transactions)}`,
            }, 'history').catch(error => {
                console.error('AI API error:', error);
            });
        });

        return {
            childId: child.id,
            childName: child.name,
            balance: child.balance,
            parent: child.parent,
            transactions: child.transactions,
            totalTransactions: child.transactions.length,
        };
    }

    private makeprompt (transactions: any[]): string {
        if (!transactions || transactions.length === 0) {
            return 'Транзакций нет';
        }

        const transactionStrings = transactions.map(transaction => {
            const date = new Date(transaction.createdAt).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
            const amount = transaction.amount / 100;
            const description = transaction.description ? `(${transaction.description})` : '';
            
            return `${date}:${amount}:${transaction.category}${description}`;
        });
        
        return transactionStrings.join(';');
    }

}
