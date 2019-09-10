import { IsEmail, MaxLength, Length, IsNumber } from 'class-validator';

export class MovementCreateDto{

    @IsNumber()
    value: number;

    @Length(4, 150)
    description:string;

    @Length(1, 10)
    state: string;
    
  
    @IsNumber()
    IDcategory: number;
    
    @IsNumber()
    IDaccount: number;
    
    @IsNumber()
    IDdebt: number;
}