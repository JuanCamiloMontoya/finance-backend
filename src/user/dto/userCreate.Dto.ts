import { IsEmail, MaxLength, Length, IsNumber } from 'class-validator';

export class UserDtoCreate {
    @IsEmail()
    @MaxLength(50)
    email: string;

    @Length(8, 50)
    password: string;

    @Length(2, 50)
    name: string;
}