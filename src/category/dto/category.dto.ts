import { Length, IsString, IsNumber } from 'class-validator';

export class CategoryDto {
    @IsNumber()
    idSubCategory: number;

    @IsString() 
    @Length(3, 50) 
    newName: string;
}