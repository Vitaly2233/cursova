import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from '../common/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: config.JWT.SECRET,
      signOptions: { expiresIn: config.JWT.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
