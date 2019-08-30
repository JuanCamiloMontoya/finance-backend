import { IsEmail, MaxLength, Length, IsNumber } from 'class-validator';

export class DebtorDtoUpdate {
    @IsNumber()
    id: number;

    @Length(2, 50)
    name: string;
    
    @Length(6, 10)
    state: string;
}