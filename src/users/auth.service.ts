import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('email in use');

    // Hash the users password
    // Generate a salt

    // Hash the salt and the password together

    // Join the hased result and the salt together

    // Create a new user and save it

    // return the user
  }

  signin() {}
}
