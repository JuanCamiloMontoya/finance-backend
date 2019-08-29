import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { category } from '../../entities/category';
import { Repository, IsNull, getManager } from 'typeorm';
import { CategoryUpdateDto } from './dto/categoryUpdate.dto';
import { CategoryInsertDto } from './dto/categoryInsert.dto';

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
            .createQueryBuilder("category")
            .select("category.name")
            .addSelect("category.state")
            .innerJoinAndSelect("category.categorys", "cat")
            .addSelect("category.name", "subcategory")
            .orderBy("category.id", "ASC")
            .getMany();
    }


    async UpdateCategory(body: CategoryUpdateDto) {
        return await this.categoryRepository
            .createQueryBuilder()
            .update(category)
            .set({
                name: body.newName,
                state: body.state
            })
            .where("id = :idCat ", { idCat: body.idCategory })
            .execute();
    }

    async createCategoryFull(body: CategoryInsertDto) {
        try {
            await getManager().transaction(async entityManager => {
                await entityManager.save(
                    this.categoryRepository.create({
                        "name": body.name,
                        "fkCategory": { id: body.fkCategory },
                        "fkMovementType": { id: body.fkMovementType },
                        "fkUser": { id: body.fkUser }
                    }));
            });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }
    async createNameCategory(body: CategoryInsertDto) {
        try {
            await getManager().transaction(async entityManager => {
                await entityManager.save(
                    this.categoryRepository.create({
                        "name": body.name,
                        "fkMovementType": { id: body.fkMovementType },
                    }));
            });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }

    async createSubCategory(body: CategoryInsertDto) {
        try {
            await getManager().transaction(async entityManager => {
                await entityManager.save(
                    this.categoryRepository.create({
                        "name": body.name,
                        "fkCategory": { id: body.fkCategory },
                        "fkMovementType": { id: body.fkMovementType },
                    }));
            });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }



}
