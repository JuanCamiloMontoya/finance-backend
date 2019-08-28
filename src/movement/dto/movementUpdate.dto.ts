import { Length, IsEmail, IsNumber } from 'class-validator';

export class MovementUpdateDto {

    @IsNumber()
    value: number;

    @Length(4, 150)
    description:string;

    @Length(1, 10)
    state: string;
    
  
    @IsNumber()
    category: number;
    
    @IsNumber()
    account: number;
    
    @IsNumber()
    debt: number;
}