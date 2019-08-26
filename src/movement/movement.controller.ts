import { Controller } from '@nestjs/common';
import {  Get, UseGuards, Req, SetMetadata, Param ,Post,Body} from '@nestjs/common';
import { MovementService } from './movement.service';
import {MovementDto} from './dto/movement.dto';

@Controller('movement')
export class MovementController {
  
    constructor(private readonly movementService: MovementService){}


    @Post('create')
    async createMovement(@Body() body: MovementDto){{
     // const response = await this.movementService.createMovement(body);
      //  return response;
    }}
    

    @Get('all/:UserId')
    async GetMovement(@Param('UserId') UserId){
      console.log(UserId)
      return this.movementService.GetMovement(UserId);
    }

    //todos
    @Get('getAll')
    async getUserAll(){{
        const response = await this.movementService.getMovementAll();
        console.log(response);
        return response;
    }}

    @Get('-/:UserId')
    async GetMovementGastos(@Param('UserId') UserId){
      console.log(UserId)
      return this.movementService.GetMovementGasto(UserId);
    }

    @Get('revenue/:UserId')
    async GetMovementRevenue(@Param('UserId') UserId){
      console.log(UserId)
      return this.movementService.GetMovementRevenue(UserId);
    }
  
}
