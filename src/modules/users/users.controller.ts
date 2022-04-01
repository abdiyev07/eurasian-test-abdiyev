import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../../common/entities/user.entity';
import { userToResponseDto } from '../../common/response-dto/user.to-response.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  @Get()
  getUser(@GetUser() user: UserEntity) {
    return userToResponseDto(user);
  }
}
