import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from '../../entities/category';

@Module({
  imports:[
    TypeOrmModule.forFeature([category])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
