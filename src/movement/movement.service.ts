import { Injectable } from '@nestjs/common';

import { movement } from '../../entities/movement';
import { user } from '../../entities/user';
import { account } from '../../entities/account';
import { category } from '../../entities/category';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementCreateDto } from './dto/movementCreate.dto';
import { AccountService } from '../account/account.service'

import { MovementUpdateDto } from './dto/movementUpdate.dto';

@Injectable()
export class MovementService {


  constructor(
    // private readonly accountService: AccountService,

    @InjectRepository(category) private readonly categoryRepository: Repository<category>,
    @InjectRepository(account) private readonly accountRepository: Repository<account>,
    @InjectRepository(user) private readonly userRepository: Repository<user>,

    @InjectRepository(movement) private readonly movementRepository: Repository<movement>

  ) { }




  async GetMovement(UserId) {

    return await this.movementRepository
      .createQueryBuilder("movement")
      .addSelect("account.title")

      .innerJoin("account", "account", "movement.fk_account = account.id")

      .where("account.fk_user= :id", { id: UserId })

      //la fk debe ser tal cual como esta en entities al lado donde se referencia
      .getMany();
    //.execute();
    /* */


  }


  async getMovementAll() {
    return await this.movementRepository.find();
  }



  async GetMovementType(UserId, typeId) {
    return await this.userRepository
      .createQueryBuilder("user")
      .select("movement.id", "id")
      .addSelect("movement.value", "valor")
      .addSelect("movement.date", "date")
      .addSelect("movement.description", "description")
      .addSelect("category.name", "category")
      .addSelect("account.title", "account")      
      .innerJoin("account", "account", "account.fk_user = user.id")
      .innerJoin("movement", "movement", "movement.fk_account = account.id")
      .innerJoin("category", "category", "category.id = movement.fk_category")
      .innerJoin("movement_type", "movement_type", "movement_type.id = category.fk_movement_type")
      .where("user.id = :user_id", { user_id: UserId })
      .andWhere("category.fk_movement_type= :type", { type: typeId })
    
      .execute();
  }



  async createMovement(Movement: MovementCreateDto) {
    try {
      await getManager().transaction(async entityManager => {
        await entityManager.save(
          this.movementRepository.create({
            "fkAccount": { id: Movement.account },
            "fkCategory": { id: Movement.category },
            "fkDebt": { id: Movement.debt },
            "value": Movement.value,
            "description": Movement.description,
            "state": Movement.state,

          }));
      });

      let type2 = await this.categoryRepository.createQueryBuilder("category").where("category.id= :id", { id: Movement.category }).execute();
      let aux = await this.accountRepository.findOne({ id: Movement.account})    

      if (type2.fkMovementType = 1) {
        const aux2=aux.initial_value-Movement.value;        
        // await this.accountRepository.createQueryBuilder()
        //   .update(account)
        //   .set({            
        //     initial_value: () => "initial_value - Movement.value"
        //   })
        //   .where("id = :id", { id: Movement.account })
        //   .execute();
        await this.accountRepository.update(
          Movement.account,
          {
             initial_value:aux2 ,
          }
        );

      } else {
        const aux2=aux.initial_value+Movement.value;
        await this.accountRepository.update(        
          Movement.account,
          {
             initial_value:aux2 ,
          }
        );
      }
      return { success: "OK" };
    } catch (error) {
      return { error: 'TRANSACTION_ERROR', detail: error };
    }
  }
  async DeleteAccount(AunconId) {
       
    try {
        await this.accountRepository.delete(
          AunconId,
           
            );
        return { success: "OK" };
    } catch (error) {
        return { error: 'TRANSACTION_ERROR', detail: error };
    }

}




}
