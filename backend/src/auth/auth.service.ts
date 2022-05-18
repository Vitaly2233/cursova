import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { TObjectId } from '../common/type/object-id.type';
import { RegisterDto } from './dto/register.dto';
import { EAuthErrors } from './enum/auth-errors.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { username, password } = dto;

    const user = await this.userService.findOne({ username });

    if (user) {
      throw new ConflictException(EAuthErrors.USER_CONFLICTS);
    }

    await this.userService.create({
      ...dto,
      password: await this.hashPassword(password),
    });
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { password, username } = dto;

    const user = await this.validateUser(password, username);

    return this.generateToken(user._id);
  }

  async changePassword(dto: ChangePasswordDto) {
    const { username, password, newPassword } = dto;

    const user = await this.validateUser(password, username);

    const hash = await this.hashPassword(newPassword);

    user.password = hash;

    await user.save();
  }

  generateToken(userId: TObjectId) {
    const payload: IJwtPayload = {
      _id: userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(password: string, username: string) {
    const findOptions: any = { username };

    const user = await this.userService.findOne(findOptions, '+password');

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!bcrypt.compareSync(password, user?.password)) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
