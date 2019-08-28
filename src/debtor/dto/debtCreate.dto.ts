import { IsEmail, MaxLength, Length, IsNumber, IsDecimal } from 'class-validator';

export class DebtDtoCreate {
    @MaxLength(300)
    description: string;

    @IsDecimal()
    value: string;

    @IsNumber()
    fk_debtor: number;
}