import { Controller } from '@nestjs/common';
import {  Get, UseGuards, Req, SetMetadata, Param ,Post,Body} from '@nestjs/common';
import { MovementService } from './movement.service';
import {MovementCreateDto} from './dto/movementCreate.dto';

@Controller('movement')
export class MovementController {
  
    constructor(private readonly movementService: MovementService){}


    @Post('create')
    async createMovement(@Body() body: MovementCreateDto){{
      const response = await this.movementService.createMovement(body);
      console.log(response);
      const response1 = await this.movementService.updateMovement(body,"create_movement"); 
      console.log(response1);
        return response;
    }}
    

    @Get('all/:UserId')
    async GetMovement(@Param('UserId') UserId){
      console.log(UserId)
      return this.movementService.getMovement(UserId);
    }

   
    @Get('getAll')
    async getUserAll(){{
        const response = await this.movementService.getMovementAll();
        console.log(response);
        return response;
    }}

    @Get('type/:UserId/:typeId')
    async GetMovementType(@Param('UserId') UserId,@Param('typeId') typeId){
     
      return await this.movementService.getMovementType(UserId,typeId);
    }

  
  
}
