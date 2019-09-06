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

  async updateMovement(date, type) {
   
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
          console.log("fdsfsf");
        try{
        // let movementType = await this.categoryRepository.find(  { id: date.category }, )
         let movementType = await this.categoryRepository
          .createQueryBuilder("category")
          .select("type.key","key")
          .innerJoin("movement_type","type", "type.id = category.fk_movement_type")
          .where("category.id= :id",
            { id: date.category })
          .execute();

          // let movementType = await this.movement_typeRepository
          // .createQueryBuilder("movement_type")
          // .select("movement_type.key")
          // .innerJoin("category", "movement_type.id = category.fk_movement_type")
          // .where("category.id= :id",
          //   { id: date.category })
          // .execute();
          console.log(movementType);
          console.log(movementType.type);
          
        //   let algo = movementType.
        // console.log();
      //  let accountValuesOld = await this.accountRepository.findOne({ id: date.account })
        // if (movementType.movementType.key = "expense") {
        //   const accountValuesNew = accountValuesOld.initial_value - date.value;
        //   await this.accountRepository.update(
        //     date.account,
        //     {
        //       initial_value: accountValuesNew,
        //     }
        //   );
        // } else {

        //   const accountValuesNew = accountValuesOld.initial_value + date.value;
        //   await this.accountRepository.update(
        //     date.account,
        //     {
        //       initial_value: accountValuesNew,
        //     }
        //   );

        // }
        return { success: "OK" };
      } catch (error) {
        return { error: 'TRANSACTION_ERROR', detail: error };
      }
    
        break;





      case "delete_movement":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        break;

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

      // let type2 = await this.categoryRepository.createQueryBuilder("category")
      //   .where("category.id= :id",
      //     { id: Movement.category })
      //   .execute();
      // let aux = await this.accountRepository.findOne({ id: Movement.account })

      // if (type2.fkMovementType = 1) {
      //   const aux2 = aux.initial_value - Movement.value;

      //   await this.accountRepository.update(
      //     Movement.account,
      //     {
      //       initial_value: aux2,
      //     }
      //   );

      // } else {
      //   const aux2 = aux.initial_value + Movement.value;
      //   await this.accountRepository.update(
      //     Movement.account,
      //     {
      //       initial_value: aux2,
      //     }
      //   );
      // }
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
