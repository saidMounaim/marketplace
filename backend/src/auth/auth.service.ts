import {
  BadRequestException,
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
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
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

  async getLoggedInUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        ads: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            userId: true,
            images: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}
