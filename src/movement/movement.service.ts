import { Injectable } from '@nestjs/common';

import { movement } from '../../entities/movement';
import { user } from '../../entities/user';
import { account } from '../../entities/account';
import { category } from '../../entities/category';
import { Repository, getManager, MoreThan, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementCreateDto } from './dto/movementCreate.dto';
import { AccountService } from '../account/account.service'

import { MovementUpdateDto } from './dto/movementUpdate.dto';
import { movement_type } from '../../entities/movement_type';

@Injectable()
export class MovementService {


  constructor(
    // private readonly accountService: AccountService,

    @InjectRepository(category) private readonly categoryRepository: Repository<category>,
    @InjectRepository(movement_type) private readonly movement_typeRepository: Repository<movement_type>,
    @InjectRepository(account) private readonly accountRepository: Repository<account>,
    @InjectRepository(user) private readonly userRepository: Repository<user>,

    @InjectRepository(movement) private readonly movementRepository: Repository<movement>

  ) { }

  async getMovement(UserId) {
    return await this.movementRepository
      .createQueryBuilder("movement")
      .addSelect("account.title")
      .innerJoin("account", "account", "movement.fk_account = account.id")
      .where("account.fk_user= :id", { id: UserId })
      .getMany();
  }

  async updateMovement(data, type) {

    switch (type) {
      case "update_debtor":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
        break;

      case "delete_debtor":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;

      case "create_debtor":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        break;

      case "create_movement":
        try {
         
          let movementType = await this.movement_typeRepository
            .createQueryBuilder()
            .select("movement_type.key")
            .innerJoin("movement_type.categorys", "category")
            .where("category.id = :id", { id: data.IDcategory })
            .getOne();
          
          let accountValuesOld = await this.accountRepository.findOne({ id: data.IDaccount });
           if (movementType.key == "expense") {
            if (accountValuesOld.initial_value > data.value) {
              const accountValuesNew = accountValuesOld.initial_value - data.value;
              await this.accountRepository.update(
                data.IDaccount,
                {
                  initial_value: accountValuesNew,
                }
              );
            } else {
              return { success: "Fondos Insuficientes" };
            }
          } else {

            const accountValuesNew = accountValuesOld.initial_value + data.value;
          
            await this.accountRepository.update(
              data.IDaccount,
              {
                initial_value: accountValuesNew,
              }
            );
          }
          return { success: "OK" };
        } catch (error) {
          return { error: 'TRANSACTION_ERROR', detail: error };
        }


      case "delete_movement":
        try {

          let NewData = await this.movementRepository
            .createQueryBuilder()
            .select("movement.value")
            .addSelect("Category.name")
            .addSelect("type.key")
            .addSelect("Account.initial_value")
            .addSelect("Account.id")
            .innerJoin("movement.fkCategory", "Category")
            .innerJoin("movement.fkAccount", "Account")
            .innerJoin("Category.fkMovementType", "type")
            .where("movement.id = :id", { id: data })
            .getOne();              

         // console.log(NewData);
          // let movement = await this.movementRepository
          //   .createQueryBuilder()
          //   // .select("movement_type.key")
          //   .innerJoinAndSelect("movement.fkCategory", "category")
          //   .innerJoinAndSelect("movement.fkAccount", "Account")
          //   .innerJoinAndSelect("category.fkMovementType", "type")
          //   .where("movement.id = :id", { id: data })
          //   .getOne();
          // console.log(movement);         
      
          if (NewData.fkCategory.fkMovementType.key == "expense") {
            
              const accountValuesNew = NewData.fkAccount.initial_value + NewData.value;
              await this.accountRepository.update(
                NewData.fkAccount.id,
                {
                  initial_value: accountValuesNew,
                }
              );
                   
          } else {
            const accountValuesNew = NewData.fkAccount.initial_value - NewData.value;
            await this.accountRepository.update(
              NewData.fkAccount.id,
              {
                initial_value: accountValuesNew,
              }
            );
          }
          return { success: "OK" };
        } catch (error) {
          return { error: 'TRANSACTION_ERROR', detail: error };
        }


      case "update_movement":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        break;

      // default:
      //   //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      //   break;
    }
  }

  async getMovementAll() {
    return await this.movementRepository.find();
  }

  async getMovementType(UserId, typeId) {
    return await this.userRepository
      .createQueryBuilder()
      .select("movements.id", "id")
      .addSelect("movements.value", "valor")
      .addSelect("movements.date", "date")
      .addSelect("movements.description", "description")
      .addSelect("category.name", "category")
      .addSelect("account.title", "account")
      .innerJoin("user.accounts", "account")
      .innerJoin("account.movements", "movements")
     // .innerJoin("account", "account", "account.fk_user = user.id")
      //.innerJoin("movement", "movement", "movement.fk_account = account.id")
   //   .innerJoin("movement.fkAccount", "Account")
     // .innerJoin("category", "category", "category.id = movement.fk_category")
      .innerJoin("movements.fkCategory", "category")
     // .innerJoin("movement_type", "movement_type", "movement_type.id = category.fk_movement_type")
      .innerJoin("category.fkMovementType", "type")
      .where("user.id = :user_id", { user_id: UserId })
      .andWhere("category.fk_movement_type= :type", { type: typeId })
      .execute();
  }



  async createMovement(Movement: MovementCreateDto) {
    try {
    
      await getManager().transaction(async entityManager => {
        await entityManager.save(
          this.movementRepository.create({
            "fkAccount": { id: Movement.IDaccount },
            "fkCategory": { id: Movement.IDcategory },
            "fkDebt": { id: Movement.IDdebt },
            "value": Movement.value,
            "description": Movement.description,
            "state": Movement.state,

          }));
      });
      return { success: "OK" };
    } catch (error) {
      return { error: 'TRANSACTION_ERROR', detail: error };
    }
  }

  async deleteMovement(MovementId) {
    try {
      await this.movementRepository.delete(
        MovementId,

      );
      return { success: "OK" };
    } catch (error) {
      return { error: 'TRANSACTION_ERROR', detail: error };
    }

  }




}
