import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Put, BadGatewayException } from '@nestjs/common';
import { DebtorService } from './debtor.service';

import { DebtorDtoCreate } from './dto/debtorCreate.dto';
import { DebtorDtoUpdate } from './dto/debtorUpdate.dto';
import { DebtDtoCreate } from './dto/debtCreate.dto';

@Controller('debtor')
export class DebtorController {
    constructor(private readonly debtorService: DebtorService,
      ) { }
  
    @Post('create')
    async createDebtor(@Body() body: DebtorDtoCreate) {
      const response: any = await this.debtorService.createDebtor(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }
  
    @Post('create-debt')
    async createDebt(@Body() body: DebtDtoCreate) {
      const response: any = await this.debtorService.createDebt(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }
  
    @Get('get-all')
    async getDebtorAll() {
      return await this.debtorService.getDebtorAll();
    }
  
    @Get('get-id/:id')
    async getDebtorId(@Param('id') id: number) {
      return await this.debtorService.getDebtorId(id);
    }
  
    @Get('get-debt-user/:id')
    async getDebtByUser(@Param('id') id: number) {
      return await this.debtorService.getDebtByUser(id);
    }
  
    @Put('update')
    async updateDebtor(@Body() body: DebtorDtoUpdate) {
      const response: any = await this.debtorService.updateDebtor(body);
      if (response.success)
        return response;
      throw new BadGatewayException(response)
    }
  }
