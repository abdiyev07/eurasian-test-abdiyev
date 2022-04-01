import { Module } from '@nestjs/common';
import { UsersImagesController } from './users-images.controller';
import { UsersImagesService } from './users-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserImageEntity } from '../../common/entities/user-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserImageEntity])],
  controllers: [UsersImagesController],
  providers: [UsersImagesService],
})
export class UsersImagesModule {}
