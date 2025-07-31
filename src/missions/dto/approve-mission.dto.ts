import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ApproveMissionDto {
  @IsBoolean()
  @IsNotEmpty()
  approved: boolean; // true - задание выполнено, false - не выполнено
} 