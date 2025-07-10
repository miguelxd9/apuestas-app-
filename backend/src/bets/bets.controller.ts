import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto, BetResponseDto } from './dto/bet.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('bets')
@UseGuards(JwtAuthGuard)
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  async createBet(
    @CurrentUser() user: User,
    @Body() createBetDto: CreateBetDto,
  ): Promise<BetResponseDto> {
    return this.betsService.createBet(user.id, createBetDto);
  }

  @Get()
  async getUserBets(@CurrentUser() user: User): Promise<BetResponseDto[]> {
    return this.betsService.getUserBets(user.id);
  }

  @Get(':id')
  async getBetById(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<BetResponseDto> {
    return this.betsService.getBetById(user.id, id);
  }
}
