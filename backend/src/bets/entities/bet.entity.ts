import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

export enum BetStatus {
  PENDING = 'pending',
  WON = 'won',
  LOST = 'lost',
  CANCELLED = 'cancelled',
}

export enum BetType {
  TEAM1 = 'team1',
  TEAM2 = 'team2',
  DRAW = 'draw',
}

@Entity('bets')
export class Bet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  odds: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  potentialWinnings: number;

  @Column({
    type: 'enum',
    enum: BetType,
  })
  betType: BetType;

  @Column({
    type: 'enum',
    enum: BetStatus,
    default: BetStatus.PENDING,
  })
  status: BetStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  winnings: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Event, (event) => event.bets)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column()
  eventId: string;

  @Column({ nullable: true })
  selectedTeam: string;

  calculatePotentialWinnings(): void {
    this.potentialWinnings = this.amount * this.odds;
  }

  isWinningBet(eventWinner: string): boolean {
    if (this.betType === BetType.TEAM1 && eventWinner === this.event.team1) {
      return true;
    }
    if (this.betType === BetType.TEAM2 && eventWinner === this.event.team2) {
      return true;
    }
    if (this.betType === BetType.DRAW && eventWinner === 'draw') {
      return true;
    }
    return false;
  }
}
