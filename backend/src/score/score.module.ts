import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schema/score.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    UserModule,
  ],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
