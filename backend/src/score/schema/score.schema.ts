import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserDocument } from '../../user/schema/user.schema';

export type ScoreDocument = Score & Document;

@Schema({ timestamps: true })
export class Score {
  @Prop()
  time: number;

  @Prop()
  moves: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: UserDocument | string;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
