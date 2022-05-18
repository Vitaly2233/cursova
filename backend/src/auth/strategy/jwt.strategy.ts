import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../../common/config';
import { IJwtPayload } from '../interface/jwt-payload.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.JWT.IGNORE_EXPIRATION,
      secretOrKey: config.JWT.SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userService.findOne({ _id: payload._id });
    if (!user) {
      return null;
    }
    return user;
  }
}
