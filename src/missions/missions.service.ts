import { 
  Injectable, 
  NotFoundException, 
  ForbiddenException,
  BadRequestException 
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { SubmitReportDto } from './dto/submit-report.dto';
import { ApproveMissionDto } from './dto/approve-mission.dto';
import { User, MissionStatus, ReportType } from '@prisma/client';

@Injectable()
export class MissionsService {
  constructor(private prisma: PrismaService) {}

  // Родитель создает задание для ребенка
  async createMission(dto: CreateMissionDto, user: User) {
    // Проверяем, что пользователь - родитель
    if (user.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can create missions');
    }

    // Проверяем, что ребенок принадлежит этому родителю
    const child = await this.prisma.child.findUnique({
      where: { id: dto.childId },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    if (child.parentId !== user.id) {
      throw new ForbiddenException('You can only create missions for your own children');
    }

    // Создаем задание
    const mission = await this.prisma.mission.create({
      data: {
        childId: dto.childId,
        parentId: user.id,
        title: dto.title,
        description: dto.description,
        target: 0, // для заданий target не используется
        reward: dto.reward,
        reportType: dto.reportType,
        status: MissionStatus.PENDING,
      },
      include: {
        child: true,
      },
    });

    return {
      id: mission.id,
      title: mission.title,
      description: mission.description,
      reward: mission.reward,
      reportType: mission.reportType,
      status: mission.status,
      childName: mission.child.name,
      createdAt: mission.createdAt,
      message: 'Mission created successfully!',
    };
  }

  // Ребенок отправляет отчет
  async submitReport(
    missionId: string,
    dto: SubmitReportDto,
    photoPath: string | null,
    user: User,
  ) {
    // Проверяем, что пользователь - ребенок
    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can submit reports');
    }

    // Находим задание
    const mission = await this.prisma.mission.findUnique({
      where: { id: missionId },
      include: { child: true },
    });

    if (!mission) {
      throw new NotFoundException('Mission not found');
    }

    // Проверяем, что задание принадлежит этому ребенку
    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    });

    if (!userWithProfile?.profile || mission.child.name !== userWithProfile.profile.fullName) {
      throw new ForbiddenException('You can only submit reports for your own missions');
    }

    // Проверяем статус задания
    if (mission.status !== MissionStatus.PENDING) {
      throw new BadRequestException('This mission is not available for reporting');
    }

    // Проверяем тип отчета и наличие данных
    if (mission.reportType === ReportType.TEXT && !dto.reportText) {
      throw new BadRequestException('Text report is required for this mission');
    }

    if (mission.reportType === ReportType.PHOTO && !photoPath) {
      throw new BadRequestException('Photo report is required for this mission');
    }

    // Обновляем задание с отчетом
    const updatedMission = await this.prisma.mission.update({
      where: { id: missionId },
      data: {
        reportText: dto.reportText,
        reportPhoto: photoPath,
      },
    });

    return {
      id: updatedMission.id,
      title: updatedMission.title,
      reportType: updatedMission.reportType,
      reportText: updatedMission.reportText,
      reportPhoto: updatedMission.reportPhoto,
      message: 'Report submitted successfully! Waiting for parent approval.',
    };
  }

  // Родитель подтверждает или отклоняет выполнение задания
  async approveMission(missionId: string, dto: ApproveMissionDto, user: User) {
    // Проверяем, что пользователь - родитель
    if (user.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can approve missions');
    }

    // Находим задание
    const mission = await this.prisma.mission.findUnique({
      where: { id: missionId },
      include: { child: true },
    });

    if (!mission) {
      throw new NotFoundException('Mission not found');
    }

    // Проверяем, что задание создано этим родителем
    if (mission.parentId !== user.id) {
      throw new ForbiddenException('You can only approve your own missions');
    }

    // Проверяем, что есть отчет
    if (!mission.reportText && !mission.reportPhoto) {
      throw new BadRequestException('No report submitted for this mission');
    }

    let updatedMission;
    let rewardMessage = '';

    if (dto.approved) {
      // Задание выполнено - даем вознаграждение
      await this.prisma.$transaction(async (prisma) => {
        // Обновляем статус задания
        updatedMission = await prisma.mission.update({
          where: { id: missionId },
          data: {
            status: MissionStatus.COMPLETED,
            approved: true,
          },
        });

        // Увеличиваем баланс ребенка
        await prisma.child.update({
          where: { id: mission.childId },
          data: {
            balance: mission.child.balance + mission.reward,
          },
        });

        // Создаем транзакцию для истории
        await prisma.transaction.create({
          data: {
            childId: mission.childId,
            amount: mission.reward,
            category: 'mission_reward',
            description: `Reward for completing mission: ${mission.title}`,
          },
        });
      });

      rewardMessage = `Child received ${mission.reward} kopecks as reward!`;
    } else {
      // Задание не выполнено - возвращаем в статус PENDING
      updatedMission = await this.prisma.mission.update({
        where: { id: missionId },
        data: {
          approved: false,
          reportText: null,
          reportPhoto: null,
        },
      });

      rewardMessage = 'Mission needs to be redone.';
    }

    return {
      id: updatedMission.id,
      title: updatedMission.title,
      status: updatedMission.status,
      approved: updatedMission.approved,
      reward: mission.reward,
      childName: mission.child.name,
      message: `Mission ${dto.approved ? 'approved' : 'rejected'} successfully! ${rewardMessage}`,
    };
  }

  // Получение заданий для ребенка
  async getChildMissions(user: User) {
    if (user.role !== 'CHILD') {
      throw new ForbiddenException('Only children can access their missions');
    }

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
        missions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!child) {
      throw new NotFoundException('Child record not found');
    }

    return {
      childId: child.id,
      childName: child.name,
      missions: child.missions,
      totalMissions: child.missions.length,
    };
  }

  // Получение заданий всех детей для родителя
  async getParentMissions(user: User) {
    if (user.role !== 'PARENT') {
      throw new ForbiddenException('Only parents can access missions');
    }

    const missions = await this.prisma.mission.findMany({
      where: { parentId: user.id },
      include: { child: true },
      orderBy: { createdAt: 'desc' },
    });

    return {
      parentId: user.id,
      missions: missions.map(mission => ({
        id: mission.id,
        title: mission.title,
        description: mission.description,
        reward: mission.reward,
        status: mission.status,
        reportType: mission.reportType,
        reportText: mission.reportText,
        reportPhoto: mission.reportPhoto,
        approved: mission.approved,
        childName: mission.child.name,
        createdAt: mission.createdAt,
      })),
      totalMissions: missions.length,
    };
  }
} 