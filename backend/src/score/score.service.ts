import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../common/abstract/entity-service.abstract';
import { UserService } from '../user/user.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score, ScoreDocument } from './schema/score.schema';

@Injectable()
export class ScoreService extends EntityService<ScoreDocument> {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: Model<ScoreDocument>,
    private readonly userService: UserService,
  ) {
    super(scoreModel);
  }

  async handleCreate(userId: string, dto: CreateScoreDto) {
    const score = await this.create({ ...dto, user: userId });

    await this.userService.updateOne(
      { _id: userId },
      { $push: { scores: score._id } },
    );

    return score;
  }
}
