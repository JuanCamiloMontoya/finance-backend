import { Length, IsEmail } from 'class-validator';

export class LoginDto {

    @IsEmail() 
    @Length(4, 50) 
    email: string;

    @Length(4, 50) 
    password: string;
}