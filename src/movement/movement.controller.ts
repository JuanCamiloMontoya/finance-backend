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
        return response;
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

    // @Get('expense/:UserId')
    // async GetMovementExpense(@Param('UserId') UserId){
    //   // console.log(UserId)
    //   return this.movementService.GetMovementExpense(UserId);
    // }

    @Get('type/:UserId/:typeId')
    async GetMovementType(@Param('UserId') UserId,@Param('typeId') typeId){
     
      return await this.movementService.GetMovementType(UserId,typeId);
    }

    // @Get('type/:UserId')
    // async GetMovementType(@Param('UserId') UserId){
    //   console.log(UserId)
    //   return this.movementService.GetMovementRevenue(UserId);
    // }
  
}
