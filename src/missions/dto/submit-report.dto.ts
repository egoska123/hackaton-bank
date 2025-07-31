import { IsString, IsOptional } from 'class-validator';

export class SubmitReportDto {
  @IsString()
  @IsOptional()
  reportText?: string; // текстовый отчет (если тип TEXT)
} 