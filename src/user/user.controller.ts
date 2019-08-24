import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Put, BadGatewayException } from '@nestjs/common';
import { UserService } from './user.service';

import { UserDtoCreate } from './dto/userCreate.Dto';
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

  @Get('get-all')
  async getUserAll() {
    return await this.userService.getUserAll();
  }

  @Get('get-id/:id')
  async getUserId(@Param('id') id: number) {
    return await this.userService.getUserId(id);
  }

  @Put('update')
  async updateUser(@Body() body: UserDtoUpdate) {
    const response: any = await this.userService.updateUser(body);
    if (response.success)
      return response;
    throw new BadGatewayException(response)
  }
}
