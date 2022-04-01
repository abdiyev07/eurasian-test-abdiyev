import { Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../../common/entities/user.entity';
import { UsersImagesService } from './users-images.service';
import { raw } from 'express';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions, USERS_IMAGE_SAVE_PATH } from '../../utils/file-upload';

@Controller('users-images')
@UseGuards(JwtAuthGuard)
export class UsersImagesController {
  constructor(private readonly usersImagesService: UsersImagesService) {}

  @Get()
  getUsersAllImages(@GetUser() user: UserEntity) {
    return this.usersImagesService.getUsersAllImages(user.id);
  }

  @Get(':id')
  getUsersImage(@GetUser() user: UserEntity, @Param('id') usersImageId: number) {
    return this.usersImagesService.getUsersImage(user.id, usersImageId);
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor(createMulterOptions(USERS_IMAGE_SAVE_PATH)))
  uploadUsersImages(@GetUser() user: UserEntity, @UploadedFiles() images: Array<Express.Multer.File>) {
    return this.usersImagesService.saveUsersImages(user.id, images, USERS_IMAGE_SAVE_PATH);
  }
}
