import { IsEmail, MaxLength, Length, IsNumber } from 'class-validator';

export class AccountUpdateDto {
    @IsNumber()
    id: number;

    @IsNumber()
    values: number;

    @Length(4, 50) 
    title: string;

    @IsNumber() 
    fkuser: number;

    @IsNumber() 
    fktype: number;

    @IsNumber() 
    fk_movimineto_type: number;
}