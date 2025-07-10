import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventStatus } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      order: { startTime: 'ASC' },
    });
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['bets'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async findOpenEvents(): Promise<Event[]> {
    return this.eventRepository.find({
      where: { status: EventStatus.OPEN },
      order: { startTime: 'ASC' },
    });
  }

  async getEventOdds(eventId: string) {
    const event = await this.findById(eventId);
    return {
      team1: { name: event.team1, odds: event.odds1 },
      team2: { name: event.team2, odds: event.odds2 },
      draw: event.oddsDraw ? { odds: event.oddsDraw } : null,
    };
  }

  async updateEventStatus(eventId: string, status: EventStatus, winner?: string) {
    const event = await this.findById(eventId);
    event.status = status;
    if (winner) {
      event.winner = winner;
    }
    if (status === EventStatus.FINISHED) {
      event.endTime = new Date();
    }
    return this.eventRepository.save(event);
  }
}
