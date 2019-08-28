import { Length, IsString, IsNumber } from 'class-validator';

export class CategoryInsertDto {
  
    @IsString() 
    @Length(4, 50) 
    name: string;

    @IsNumber()
    fkCategory: number;
    
    @IsNumber()
    fkMovementType: number;
   
    @IsNumber()
    fkUser: number;
}