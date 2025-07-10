import { IsUUID, IsNumber, IsEnum, Min, IsNotEmpty } from 'class-validator';
import { BetType } from '../entities/bet.entity';

export class CreateBetDto {
  @IsUUID()
  eventId: string;

  @IsEnum(BetType)
  betType: BetType;

  @IsNumber()
  @Min(1)
  amount: number;
}

export class BetResponseDto {
  id: string;
  amount: number;
  odds: number;
  potentialWinnings: number;
  betType: BetType;
  status: string;
  selectedTeam: string;
  createdAt: Date;
  event: {
    id: string;
    title: string;
    team1: string;
    team2: string;
  };
}
