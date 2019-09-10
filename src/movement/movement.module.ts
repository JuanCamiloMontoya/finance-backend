import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { movement } from '../../entities/movement';
import { user } from '../../entities/user';
import { account } from '../../entities/account';
import { category } from '../../entities/category';
import { movement_type } from '../../entities/movement_type';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([user, movement,category,account,movement_type])
  ],
  controllers: [MovementController],
  providers: [MovementService]
})
export class MovementModule {}
