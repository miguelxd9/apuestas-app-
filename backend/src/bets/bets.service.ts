import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet, BetType, BetStatus } from './entities/bet.entity';
import { Event, EventStatus } from '../events/entities/event.entity';
import { User } from '../users/entities/user.entity';
import { CreateBetDto, BetResponseDto } from './dto/bet.dto';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private readonly betRepository: Repository<Bet>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBet(userId: string, createBetDto: CreateBetDto): Promise<BetResponseDto> {
    const { eventId, betType, amount } = createBetDto;

    // Validate event exists and is open
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.status !== EventStatus.OPEN) {
      throw new BadRequestException('Event is not open for betting');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    // Get odds based on bet type
    let odds: number;
    let selectedTeam: string;

    switch (betType) {
      case BetType.TEAM1:
        odds = event.odds1;
        selectedTeam = event.team1;
        break;
      case BetType.TEAM2:
        odds = event.odds2;
        selectedTeam = event.team2;
        break;
      case BetType.DRAW:
        if (!event.oddsDraw) {
          throw new BadRequestException('Draw betting not available for this event');
        }
        odds = event.oddsDraw;
        selectedTeam = 'Draw';
        break;
      default:
        throw new BadRequestException('Invalid bet type');
    }

    // Create bet
    const bet = this.betRepository.create({
      userId,
      eventId,
      betType,
      amount,
      odds,
      selectedTeam,
    });

    bet.calculatePotentialWinnings();
    const savedBet = await this.betRepository.save(bet);

    // Update user balance
    user.balance -= amount;
    await this.userRepository.save(user);

    // Update event total bets
    event.totalBets += amount;
    await this.eventRepository.save(event);

    return this.mapToResponseDto(savedBet, event);
  }

  async getUserBets(userId: string): Promise<BetResponseDto[]> {
    const bets = await this.betRepository.find({
      where: { userId },
      relations: ['event'],
      order: { createdAt: 'DESC' },
    });

    return bets.map((bet) => this.mapToResponseDto(bet, bet.event));
  }

  async getBetById(userId: string, betId: string): Promise<BetResponseDto> {
    const bet = await this.betRepository.findOne({
      where: { id: betId, userId },
      relations: ['event'],
    });

    if (!bet) {
      throw new NotFoundException('Bet not found');
    }

    return this.mapToResponseDto(bet, bet.event);
  }

  private mapToResponseDto(bet: Bet, event: Event): BetResponseDto {
    return {
      id: bet.id,
      amount: bet.amount,
      odds: bet.odds,
      potentialWinnings: bet.potentialWinnings,
      betType: bet.betType,
      status: bet.status,
      selectedTeam: bet.selectedTeam,
      createdAt: bet.createdAt,
      event: {
        id: event.id,
        title: event.title,
        team1: event.team1,
        team2: event.team2,
      },
    };
  }
}
