import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get('open')
  async findOpenEvents() {
    return this.eventsService.findOpenEvents();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Get(':id/odds')
  async getEventOdds(@Param('id') id: string) {
    return this.eventsService.getEventOdds(id);
  }
}
