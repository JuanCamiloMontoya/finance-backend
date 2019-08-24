import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { category } from '../../entities/category';
import { Repository, IsNull } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
 
@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(category)
        private readonly categoryRepository: Repository<category>,
    ) { }

    //retorna todas las categorias 
    async getAllCategory() {
        return await this.categoryRepository.find({
            select: ["name"],
            where: {
                fkCategory: IsNull()
            },
            order: {
                id: "ASC"
            }
        })
    }

    //retorna todas las categorias para el ingreso
    async getAllCategoryIncome() {
        return await this.categoryRepository.find({
            select: ["name"],
            where: {
                fkCategory: IsNull(),
                fkMovementType: 2
            },
            order: {
                id: "ASC"
            }
        })
    }

    //retorna todas las categorias para el gasto
    async getAllCategoryExpense() {
        return await this.categoryRepository.find({
            select: ["name"],
            where: {
                fkCategory: IsNull(),
                fkMovementType: 1
            },
            order: {
                id: "ASC"
            }
        })
    }

    //retorna todas las categorias con la subcategoria
    async getAllCategorySubCategory() {
        return await this.categoryRepository
            .createQueryBuilder()
            .select("ca.name", "General category")
            .addSelect("GROUP_CONCAT(cat.name)", "subcategory")
            .addSelect("ca.state ")
            .addFrom("category", "ca")
            .innerJoin("category", "cat", "cat.fk_category = ca.id")
            .groupBy("ca.id")
            .orderBy("ca.id", "ASC")
            .getMany();
    }

    async UpdateSubcategory(body: CategoryDto ) {
        return await this.categoryRepository
            .createQueryBuilder()
            .update(category)
            .set({
                name: body.newName
            })
            .where("fkCategory = :idFkCat ", { idFkCat: body.idSubCategory })
            .execute();
    }

}
