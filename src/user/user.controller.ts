import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Put, BadGatewayException } from '@nestjs/common';
import { UserService } from './user.service';

import { UserDtoCreate } from './dto/userCreate.dto';
import { UserDtoUpdate } from './dto/userUpdate.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async createUser(@Body() body: UserDtoCreate) {
    const response: any = await this.userService.createUser(body);
    if (response.success)
      return response;
    throw new BadGatewayException(response)
  }

  @Get('get/:type') 
  async getUserAll(@Param('type') type) {
    return await this.userService.getUser(type);
  }

  @Put('update')
  async updateUser(@Body() body: UserDtoUpdate) {
    const response: any = await this.userService.updateUser(body);
    if (response.success)
      return response;
    throw new BadGatewayException(response)
  }
}
