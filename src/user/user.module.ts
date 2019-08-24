import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { user } from '../../entities/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([user])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
