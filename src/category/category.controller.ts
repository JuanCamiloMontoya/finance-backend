import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

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

    @Post('Update/Subcategory')
    async UpdateSubCategory(@Body() body: CategoryDto) {
        return this.categoryService.UpdateSubcategory(body);
    }

}
