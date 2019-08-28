import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { user } from '../../entities/user';

import { account } from '../../entities/account';
import { AccountUpdateDto } from './dto/accountUpdate.dto';

import { AccountCreateDto } from './dto/accountCreate.dto';

@Injectable()
export class AccountService {

    constructor(

        @InjectRepository(account) private readonly accountRepository: Repository<account>,
        @InjectRepository(user) private readonly userRepository: Repository<user>

    ) { }

    async createAccount(body: AccountCreateDto) {
        try {
            await getManager().transaction(async entityManager => {
                console.log(body);
                await entityManager.save(
                    this.accountRepository.create({
                        "title": body.title,
                        "initial_value": body.initial_values,
                        "fkUser": { id: body.fkuser },
                        "fkAccountType": { id: body.fktype }
                    }));
            });
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }


    async getAccountAll() {
        return await this.accountRepository.find();
    }
 
    async getAccountId(id: number) {
        return await this.accountRepository.findOne({ id: id }, { relations: ["fkUser"] });
    }

    async UpdateAccount(account: AccountUpdateDto) {
       
            try {
                await this.accountRepository.update(
                    account.id,
                    { 
                        title: account.title,
                        initial_value: account.values,
                        "fkUser": { id: account.fkuser },
                        "fkAccountType": { id: account.fktype } 
                     }
                    );
                return { success: "OK" };
            } catch (error) {
                return { error: 'TRANSACTION_ERROR', detail: error };
            }
        
    }

    async UpdateAccountByMovement(account: AccountUpdateDto) {
       
        try {
            await this.accountRepository.update(
                account.id,
                { 
                    title: account.title,
                    initial_value: account.values,
                    "fkUser": { id: account.fkuser },
                    "fkAccountType": { id: account.fktype } 
                 }
                );
            return { success: "OK" };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    
}

   


    
}
