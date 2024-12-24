import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userServcie: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userServcie.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userServcie.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userServcie.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userServcie.remove(parseInt(id));
  }
}
