import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { debtor } from '../../entities/debtor';
import { debt } from '../../entities/debt';
import { user } from '../../entities/user';

import { DebtorDtoCreate } from './dto/debtorCreate.dto';
import { DebtorDtoUpdate } from './dto/debtorUpdate.dto';
import { DebtDtoCreate } from './dto/debtCreate.dto';

@Injectable()
export class DebtorService {

    constructor(
        @InjectRepository(debtor) private readonly debtorRepository: Repository<debtor>,
        @InjectRepository(debt) private readonly debtRepository: Repository<debt>,
        @InjectRepository(user) private readonly userRepository: Repository<user>
    ) { }

    async createDebtor(debtor: DebtorDtoCreate) {
        try {
            await getManager().transaction(async entityManager => {
                await entityManager.save(
                    this.debtorRepository.create({
                        "name": debtor.name,
                        "fkUser": { id: debtor.fk_user }
                    }));
            });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }

    async createDebt(debt: DebtDtoCreate) {
        try {
            await getManager().transaction(async entityManager => {
                await entityManager.save(
                    this.debtRepository.create({
                        "description": debt.description,
                        "value": debt.value,
                        "fkDebtor": { id: debt.fk_debtor }
                    }));
            });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }

    async getDebtorAll() {
        return await this.debtorRepository.find();
    }

    async getDebtorId(id: number) {
        return await this.debtorRepository.findOne({ id: id });
    }

    async getDebtByUser(id: number) {
        return this.userRepository.createQueryBuilder()
            .select()
            .innerJoinAndSelect("user.debtors", "debtor")
            .innerJoinAndSelect("debtor.debts", "debt")
            .where("user.id = :id", {id})
            .getMany();
    }

    async updateDebtor(debtor: DebtorDtoUpdate) {
        try {
            await this.debtorRepository.update(
                debtor.id,
                {
                    name: debtor.name,
                    state: debtor.state
                });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }
}
