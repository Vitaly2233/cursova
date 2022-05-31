import { PickType } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Score } from '../schema/score.schema';

export class CreateScoreDto extends PickType(Score, ['moves', 'time']) {
  @IsNumber()
  @Min(0)
  moves: number;

  @IsNumber()
  @Min(0)
  time: number;
}
