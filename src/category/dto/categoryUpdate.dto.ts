import { Length, IsString, IsNumber } from 'class-validator';

export class CategoryUpdateDto {
    @IsNumber()
    idSubCategory: number;

    @IsString() 
    @Length(3, 50) 
    newName: string;
}