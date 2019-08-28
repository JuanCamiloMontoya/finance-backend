import { Length, IsString, IsNumber } from 'class-validator';

export class CategoryUpdateDto {
    @IsNumber()
    idCategory: number;

    @IsNumber()
    FKidCategory: number;

    @IsString() 
    @Length(3, 50) 
    newName: string;

    @IsString() 
    @Length(3, 50) 
    state: string;


}