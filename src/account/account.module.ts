import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

import { user } from '../../entities/user';

import { account } from '../../entities/account';

@Module({
  imports: [
    TypeOrmModule.forFeature([user,account])
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule { }
