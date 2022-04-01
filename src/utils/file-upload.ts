import * as path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

const SAVE_IMG_PATH = path.join('static', 'images');
export const USERS_IMAGE_SAVE_PATH = path.join(SAVE_IMG_PATH, 'users_uploaded');

export type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

export const createMulterOptions = (pathToSave: string): MulterOptions => {
  return {
    storage: diskStorage({
      destination: path.resolve(pathToSave),
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  };
};

export const checkIsFilesNotEmpty = (files: Array<Express.Multer.File> | undefined): void => {
  if (!files || !files.length)
    throw new HttpException('Загружаемые файлы не должены быть пустыми', HttpStatus.BAD_REQUEST);
};

const imageFileFilter = (req: any, file: MulterFile, cb: (error: Error | null, acceptFile: boolean) => void) => {
  // Можно было бы и поставить какой-то сложный фильтр для проверки является ли это реальным изображением
  // но делаю на быструю руку)))
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new HttpException('Допустима загрузка только изображений!', HttpStatus.BAD_REQUEST), false);
  }
  cb(null, true);
};

const editFileName = (req: any, file: MulterFile, cb: (error: Error | null, filename: string) => void) => {
  const name = file.originalname.split('.')[0];
  const extName = path.extname(file.originalname);
  const randomName = Array(8)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const fullName = `${name}-${randomName}${extName}`.replace(/ /g, '');
  cb(null, fullName);
};
