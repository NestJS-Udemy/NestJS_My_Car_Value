import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userServcie: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    // this.userServcie.create(body.email, body.password);
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userServcie.findOne(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userServcie.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userServcie.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userServcie.update(parseInt(id), body);
  }
}
