import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from './dto/account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {


    constructor(        private readonly accountService: AccountService    ) { }

    @Post('login')
    async login(@Body() body: AccountDto) {
        const response = await this.accountService.createAccount(body);
        
        // if (response)
        //     return { payload: this.jwtService.sign({ ...response }) }
            
        // throw new UnauthorizedException({ error: "USER_NOT_EXIST", detail: "El usuario no existe" });
    }
}
