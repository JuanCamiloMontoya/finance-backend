import { Controller, Post, Body, Get, Param,HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from './dto/account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {


    constructor(        private readonly accountService: AccountService    ) { }

    @Post('create')
    async login(@Body() body: AccountDto) {
        const response = await this.accountService.createAccount(body);
        
        
        // if (response)
        //     return { payload: this.jwtService.sign({ ...response }) }
            
        // throw new UnauthorizedException({ error: "USER_NOT_EXIST", detail: "El usuario no existe" });
    }

    @Get('getAll')
    async getAccountAll(){{         
        return  await this.accountService.getAccountAll();
    }}

    @Get('getId/:UserId')
    async getAccountId(@Param('UserId') UserId){{         
        return  await this.accountService.getAccountId(UserId);
    }}


}
