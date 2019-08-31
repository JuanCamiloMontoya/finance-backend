import { Controller, Get, Post, Body, BadGatewayException, Put, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryUpdateDto } from './dto/categoryUpdate.dto';
import { CategoryInsertDto } from './dto/categoryInsert.dto';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get('/get/:type')
    async getAllCategory(@Param('type') type) {
        return await this.categoryService.getCategoryByType(type);
    }

    @Get('/subcategory')
    async getAllCategorySubCategory() {
        return await this.categoryService.getAllCategorySubCategory();
    }

    @Put('update')
    async UpdateCategory(@Body() body: CategoryUpdateDto) {
        return await this.categoryService.UpdateCategory(body);
    }

    @Post('user/create')
    async createCategortyUser(@Body() body: CategoryInsertDto) {
      const response: any = await this.categoryService.createCategoryUser(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }

    @Post('create-typecategory')
    async createCategorty(@Body() body: CategoryInsertDto) {
      const response: any = await this.categoryService.createNameCategory(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }

    @Post('create-subcategory')
    async createSubCategorty(@Body() body: CategoryInsertDto) {
      const response: any = await this.categoryService.createSubCategory(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }

}
