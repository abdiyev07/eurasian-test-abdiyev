import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersImagesModule } from './modules/users-images/users-images.module';
import * as path from 'path';
import ormConfig from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('static'),
      exclude: ['/api*'],
      serveRoot: '/static',
    }),
    AuthModule,
    UsersModule,
    UsersImagesModule,
  ],
})
export class AppModule {}
