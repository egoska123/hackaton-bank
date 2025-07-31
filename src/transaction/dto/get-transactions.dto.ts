import { IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  token: string;
}
