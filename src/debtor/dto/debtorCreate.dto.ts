import { IsEmail, MaxLength, Length, IsNumber } from 'class-validator';

export class DebtorDtoCreate {
    @Length(2, 50)
    name: string;

    @IsNumber()
    fk_user: number;
}