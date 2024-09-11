import {
  HttpException,
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/RegisterUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password && !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(userInfo: RegisterUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (user) {
      throw new HttpException('User already exist', 401);
    }

    const hashedPassword = bcrypt.hashSync(userInfo.password, 10);

    const newUser = this.prisma.user.create({
      data: {
        ...userInfo,
        password: hashedPassword,
      },
    });

    return newUser;
  }
}
