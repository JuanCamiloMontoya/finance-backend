import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { account_type } from '../../../entities/account_type';

import { initDataDB } from '../constanst/account_type';
@Injectable()
export class AccountTypeInitDbService {

    data: any = initDataDB
    constructor(
      @InjectRepository(account_type)
      private readonly accounttypeRepository: Repository<account_type>
    ) {}

    async default(){
      this.data.forEach(async item => {
        const isExist = await this.accounttypeRepository.find({ where: { name: item.name } })

        if(isExist.length == 0) this.accounttypeRepository.save(item)
      });
    }
}
