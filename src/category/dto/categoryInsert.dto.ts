import { Length, IsString, IsNumber } from 'class-validator';
import { category } from '../../../entities/category';
import { movement_type } from '../../../entities/movement_type';
import { user } from '../../../entities/user';
import { isNull } from 'util';

export class CategoryInsertDto {
  
    @IsString() 
    @Length(4, 50) 
    name: string;

    @IsNumber()
    fkCategory: category;
    
    @IsNumber()
    fkMovementType: movement_type;
   
    @IsNumber()
    fkUser: user;
}