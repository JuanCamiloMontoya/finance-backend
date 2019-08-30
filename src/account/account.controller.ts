import { Controller, Post, Body, Get, Param,Delete,HttpException, HttpStatus, UnauthorizedException,BadGatewayException,Put  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountCreateDto } from './dto/accountCreate.dto';
import { AccountService } from './account.service';
import { AccountUpdateDto } from './dto/accountUpdate.dto';

@Controller('account')
export class AccountController {


    constructor(        private readonly accountService: AccountService    ) { }

    @Post('create')
    async createAccount(@Body() body: AccountCreateDto) {
        const response = await this.accountService.createAccount(body);
        
        
     
    }

    @Get('getAll')
    async getAccountAll(){{         
        return  await this.accountService.getAccountAll();
    }}

    @Get('getId/:UserId')
    async getAccountId(@Param('UserId') UserId){{         
        return  await this.accountService.getAccountId(UserId);
    }}

    @Put('update')
    async AccountUpdate(@Body() body: AccountUpdateDto){{         
        const response: any = await this.accountService.UpdateAccount(body);
        if (response.success)
          return response;
        throw new BadGatewayException(response)
    }}


    @Delete('delete/:AccountId')
    async DeleteAccountId(@Param('AccountId') AccountId){         
    
        return  await this.accountService.DeleteAccount(AccountId);
    }

}
