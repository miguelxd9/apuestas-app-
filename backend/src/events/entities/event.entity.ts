import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Bet } from '../../bets/entities/bet.entity';

export enum EventStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  FINISHED = 'finished',
}

export enum SportType {
  FOOTBALL = 'football',
  BASKETBALL = 'basketball',
  TENNIS = 'tennis',
  BASEBALL = 'baseball',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: SportType,
  })
  sportType: SportType;

  @Column()
  team1: string;

  @Column()
  team2: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  odds1: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  odds2: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  oddsDraw: number;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.OPEN,
  })
  status: EventStatus;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  winner: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalBets: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Bet, (bet) => bet.event)
  bets: Bet[];

  get isOpen(): boolean {
    return this.status === EventStatus.OPEN;
  }

  get isFinished(): boolean {
    return this.status === EventStatus.FINISHED;
  }
}
