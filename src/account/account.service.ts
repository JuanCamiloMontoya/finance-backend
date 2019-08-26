import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { user } from '../../entities/user';

import { account } from '../../entities/account';


import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {

    constructor(
    
        @InjectRepository(account) private readonly accountRepository: Repository<account>,
        @InjectRepository(user) private readonly userRepository: Repository<user>

    ) { }

     async createAccount(Account: AccountDto) {
        let response;
        try {
            await getManager().transaction(async entityManager => {
               
                await entityManager.save(
                    this.accountRepository.create({
                        // "email": user.email,
                        // "password": user.password,
                        // "fkIdPerson": { id_person: newUser.id_person }
                    }));

                // response = { "code": "3", "message": `Éxito: ${newAccount.id_person}` };
            });
        } catch (error) {
            response = { "code": "1", "message": `Error: ${error}` };
        } finally {
            return response;
        }
    }

    async getAccountAll() {
        return await this.accountRepository.find();
    }
    // { relations: ["fkPerson"] }
    async getAccountId(id: number) {
        return await this.accountRepository.findOne({ id: id }, { relations: ["fkPerson"] });
    }

    // async getAccountAll(id: number) {
    //     return         await this.accountRepository
    //     .createQueryBuilder("account")
        
        
    
    //     .where("account.fkIdPerson= :fk_id_persona", { fk_id_persona: id } )
    
    //    //la fk debe ser tal cual como esta en entities al lado donde se referencia
    //      .execute();
    //     return await this.accountRepository.findOneOrFail({ id_account: id }, { relations: ["fkPerson"] });
    // }
}
