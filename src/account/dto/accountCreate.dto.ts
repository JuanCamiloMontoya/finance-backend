import { Length, IsEmail, IsNumber } from 'class-validator';

export class AccountCreateDto {
 
    @Length(4, 50) 
    title: string;

    @IsNumber() 
    initial_values: number;

    @IsNumber() 
    fkuser: number;

    @IsNumber() 
    fktype: number;

}