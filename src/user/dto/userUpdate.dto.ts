import { IsEmail, MaxLength, Length, IsNumber } from 'class-validator';

export class UserDtoUpdate {
    @IsNumber()
    id: number;

    @Length(2, 30)
    name: string;
}