import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Put, BadGatewayException, UseGuards, Req } from '@nestjs/common';
import { DebtorService } from './debtor.service';

import { DebtorDtoCreate } from './dto/debtorCreate.dto';
import { DebtorDtoUpdate } from './dto/debtorUpdate.dto';
import { DebtDtoCreate } from './dto/debtCreate.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('debtor')
export class DebtorController {
    constructor(private readonly debtorService: DebtorService,
      ) { }
  
    @Post('create')
    @UseGuards(AuthGuard('bearer'))
    async createDebtor(@Body() body: DebtorDtoCreate) {
      const response: any = await this.debtorService.createDebtor(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }
  
    @Post('create-debt')
    @UseGuards(AuthGuard('bearer'))
    async createDebt(@Body() body: DebtDtoCreate) {
      const response: any = await this.debtorService.createDebt(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }
  
    @Get('get-all')
    @UseGuards(AuthGuard('bearer'))
    async getDebtorAll() {
      return await this.debtorService.getDebtorAll();
    }
  
    @Get('get-id/:id')
    @UseGuards(AuthGuard('bearer'))
    async getDebtorId(@Param('id') id: number) {
      return await this.debtorService.getDebtorId(id);
    }
  
    @Get('user/get-debt')
    @UseGuards(AuthGuard('bearer'))
    async getDebtByUser(@Req() req) {
      return await this.debtorService.getDebtByUser(req.user.id);
    }
  
    @Put('update')
    @UseGuards(AuthGuard('bearer'))
    async updateDebtor(@Body() body: DebtorDtoUpdate) {
      const response: any = await this.debtorService.updateDebtor(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }
  }
