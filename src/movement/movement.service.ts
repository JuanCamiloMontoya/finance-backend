import { Injectable } from '@nestjs/common';

import { movement } from '../../entities/movement'; 
import { user } from '../../entities/user';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {MovementDto} from './dto/movement.dto';

@Injectable()
export class MovementService {


    constructor(
       // @InjectRepository(person) private readonly personRepository: Repository<person>,
        @InjectRepository(user) private readonly userRepository: Repository<user>,
        @InjectRepository(movement) private readonly movementRepository: Repository<movement>
        
    ) { }



   
  //  async createMovement(movement: MovementDto){
  //   let response;
  //   try {
  //       await getManager().transaction(async entityManager => {
            

  //           await entityManager.save(
  //               this.movementRepository.create({
  //                    "":,
  //                   "password": movement.password
                    
  //               }));

  //           response = { "code": "3", "message": `Éxito: ${movement.}` };
  //       });
  //   } catch (error) {
  //       response = { "code": "1", "message": `Error: ${error}` };
  //   } finally {
  //       return response;
  //   }

  //  }

    async GetMovement(UserId){
       
        return         await this.movementRepository
        .createQueryBuilder("movement")
        .addSelect("account.title")
        
        .innerJoin("account","account","movement.fk_account = account.id") 
    
        .where("account.fk_user= :id", { id : UserId } )
    
       //la fk debe ser tal cual como esta en entities al lado donde se referencia
         .getMany();
         //.execute();
    /* */
      
    
      }


      async getMovementAll() {
        return await this.movementRepository.find();
    }

      async GetMovementGasto(UserId){
        
        return await this.userRepository
        .createQueryBuilder("user1")
        .select("movement.id_movement", "id")
        .addSelect("movement.mo_value", "valor")
        .addSelect("movement.mo_date", "fecha")
        .addSelect("movement.mo_description", "description")
        .addSelect("category.ca_name", "Category_name")
        .addSelect("cuenta.acc_title", "cuenta")
        
     // .subQuery  
        .innerJoin("account", "cuenta", "cuenta.fk_id_person = user1.id_user")
        .innerJoin("movement","movement","movement.fk_id_account = cuenta.id_account") 
        .innerJoin("movement_type", "movement_type", "movement_type.id_type_movement = movement.fk_type_movem")
        .innerJoin("category", "category", "category.id_category = movement.fk_id_category")
        .where("user1.id_user = :user1_id", { id_user: UserId } )
        .andWhere("movement_type.mt_name= :type", { type: "Gastos" } )
       
         .execute();
    /* */
     
      }

      async GetMovementRevenue(UserId){
        return await this.userRepository
        .createQueryBuilder("user1")
        .select("movement.id", "id")
        .addSelect("movement.value", "valor")
        .addSelect("movement.date", "fecha")
        .addSelect("movement.description", "description")
        .addSelect("category.name", "Category_name")
        .addSelect("cuenta.title", "cuenta")
        
     // .subQuery  
        .innerJoin("account", "cuenta", "cuenta.fk_id_person = user1.id_user")
        .innerJoin("movement","movement","movement.fk_id_account = cuenta.id_account") 
        .innerJoin("movement_type", "movement_type", "movement_type.id_type_movement = movement.fk_type_movem")
        .innerJoin("category", "category", "category.id_category = movement.fk_id_category")
        .where("user1.id_user = :user1_id", { user1_id: UserId } )
        .andWhere("movement_type.mt_name= :type", { type: "Ingresos" } )
       
         .execute();
    /* */
     
      }
}
