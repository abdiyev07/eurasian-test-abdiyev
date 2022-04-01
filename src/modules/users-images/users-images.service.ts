import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImageEntity } from '../../common/entities/user-image.entity';
import { Repository } from 'typeorm';
import { checkIsFilesNotEmpty } from '../../utils/file-upload';
import { SUCCESS_RESPONSE } from '../../common/response-dto/common.response.dto';

@Injectable()
export class UsersImagesService {
  constructor(@InjectRepository(UserImageEntity) private readonly userImagesRepo: Repository<UserImageEntity>) {}

  async getUsersAllImages(userId: number) {
    return await this.userImagesRepo.find({ where: { user_id: userId } });
  }

  async getUsersImage(userId: number, imageId: number) {
    const image = await this.userImagesRepo.findOne({ where: { user_id: userId, id: imageId } });
    if (!image) throw new NotFoundException();
    return image;
  }

  async saveUsersImages(userId: number, images: Array<Express.Multer.File>, savedImgFolder: string) {
    checkIsFilesNotEmpty(images);

    const usersImageEntities = [];
    images.forEach((image) => {
      const imgPath = `${savedImgFolder}/${image.filename}`;
      const entity = this.userImagesRepo.create({
        user_id: userId,
        path: imgPath,
      });
      usersImageEntities.push(entity);
    });

    await this.userImagesRepo.save(usersImageEntities);
    return SUCCESS_RESPONSE;
  }
}
