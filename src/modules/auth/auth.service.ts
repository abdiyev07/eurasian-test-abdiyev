import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './auth.helper';
import { UserEntity } from '../../common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { userToResponseDto } from '../../common/response-dto/user.to-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.usersService.findUserById(payload.user_id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByPhone(loginDto.phone_number);
    if (!user) {
      throw new HttpException('Пользователь с таким номером не зарегистрирован', HttpStatus.BAD_REQUEST);
    }

    const arePasswordsEqual = await bcrypt.compare(loginDto.password, user.password);
    if (!arePasswordsEqual) {
      throw new HttpException('Введен неверный пароль', HttpStatus.BAD_REQUEST);
    }
    const token = this._createToken(user);

    return {
      token,
      ...userToResponseDto(user),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findUserByPhone(registerDto.phone_number);
    if (user) {
      throw new HttpException('Пользователь с таким номером уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.createUser(registerDto);

    return {
      message: 'Регистрация прошла успешна',
    };
  }

  private _createToken(user: UserEntity): string {
    return this.jwtService.sign({ id: user.id });
  }
}
