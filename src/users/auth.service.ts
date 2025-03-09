import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }

  private async comparePasswords(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    const [salt, storedHash] = storedPassword.split('.');
    const hash = (await scrypt(suppliedPassword, salt, 32)) as Buffer;
    return storedHash === hash.toString('hex');
  }

  async authSignup(email: string, password: string) {
    // 이메일 중복 체크
    const [user] = await this.usersService.find(email);
    if (user) throw new BadRequestException('Email already in use');

    // 비밀번호 해싱
    const hashedPassword = await this.hashPassword(password);

    // 유저 생성
    return this.usersService.create(email, hashedPassword);
  }

  async authSignin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const validPassword = await this.comparePasswords(user.password, password);
    if (!validPassword) throw new BadRequestException('Invalid password');

    return user;
  }
}
