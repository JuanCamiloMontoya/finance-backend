import { Controller, Get, Post, Body, BadGatewayException, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryUpdateDto } from './dto/categoryUpdate.dto';
import { CategoryInsertDto } from './dto/categoryInsert.dto';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get('/all')
    async getAllCategory() {
        return this.categoryService.getAllCategory();
    }

    @Get('/all/Income')
    async getAllCategoryIncome() {
        return this.categoryService.getAllCategoryIncome();
    }

    @Get('/all/Expense')
    async getAllCategoryExpense() {
        return this.categoryService.getAllCategoryExpense();
    }

    @Get('/subcategory')
    async getAllCategorySubCategory() {
        return this.categoryService.getAllCategorySubCategory();
    }
    @Get('/subcategory2')
    async getAllCategorySubCategory2() {
        return this.categoryService.getAllCategorySubCategory2();
    }

    @Put('Update/Subcategory')
    async UpdateSubCategory(@Body() body: CategoryUpdateDto) {
        return this.categoryService.UpdateSubcategory(body);
    }

    @Post('create/Full')
    async createCategortyFull(@Body() body: CategoryInsertDto) {
      const response: any = await this.categoryService.createCategoryFull(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }

    @Post('create/TypeCategory')
    async createCategorty(@Body() body: CategoryInsertDto) {
      const response: any = await this.categoryService.createNameCategory(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }

    @Post('create/SubCategory')
    async createSubCategorty(@Body() body: CategoryInsertDto) {
      const response: any = await this.categoryService.createSubCategory(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }

}
