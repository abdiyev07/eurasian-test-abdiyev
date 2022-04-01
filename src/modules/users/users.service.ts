import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>) {}

  async findUserByPhone(phone: string): Promise<UserEntity | undefined> {
    return await this.usersRepo.findOne({ where: { phone_number: phone } });
  }

  async findUserById(user_id: number): Promise<UserEntity | undefined> {
    return await this.usersRepo.findOne(user_id);
  }

  async createUser(payload: RegisterDto): Promise<UserEntity> {
    const user = this.usersRepo.create({ ...payload });
    return await this.usersRepo.save(user);
  }
}
