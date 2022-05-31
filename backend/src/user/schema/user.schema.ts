import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ScoreDocument } from '../../score/schema/score.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop({ select: false })
  password: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Score' }] })
  scores: ScoreDocument[] | string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
