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

    async getCategoryByType(type) {
        const customWhere = type != 'all'? { fkMovementType: type == 'income'? 2: 1 }: {}
        return await this.categoryRepository.find({
            select: ["id","name"],
            where: { fkCategory: IsNull(), ...customWhere },
            order: { id: "ASC" }
        })
    }


    async getAllCategorySubCategory() {
        return await this.categoryRepository
            .createQueryBuilder("category")
            .select(["category.name", "category.id"])
            .addSelect(["cat.id", "cat.name"])
            .innerJoin("category.categorys", "cat")
            .orderBy("category.id", "ASC")
            .getMany();
    }


    async UpdateCategory(body: CategoryUpdateDto) {
        return await this.categoryRepository
            .createQueryBuilder()
            .update(category)
            .set(body)
            .where("id = :id", body)
            .execute();
    }
 
    async createCategoryUser(body: CategoryInsertDto) {
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
