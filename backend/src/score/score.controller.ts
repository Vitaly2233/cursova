import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreService } from './score.service';

@Controller('score')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  saveScore(@Req() req, @Body() dto: CreateScoreDto) {
    return this.scoreService.handleCreate(req.user._id, dto);
  }
}
