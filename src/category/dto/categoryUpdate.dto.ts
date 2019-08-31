import { Length, IsString, IsNumber } from 'class-validator';

export class CategoryUpdateDto {
    @IsNumber()
    id: number;

    @IsString() 
    @Length(3, 50) 
    name: string;

    @IsString() 
    @Length(3, 50) 
    state: string;


}