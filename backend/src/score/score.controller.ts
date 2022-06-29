import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreService } from './score.service';

@Controller('score')
@ApiBearerAuth()
@ApiTags('Score')
@UseGuards(JwtAuthGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  saveScore(@Req() req, @Body() dto: CreateScoreDto) {
    return this.scoreService.handleCreate(req.user._id, dto);
  }

  @Get('last_scores')
  getLastScores(@Req() req: Request) {
    return this.scoreService.getLastScores(req.user);
  }
}
