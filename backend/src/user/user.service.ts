import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../common/abstract/entity-service.abstract';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService extends EntityService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }
}
