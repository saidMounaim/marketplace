import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/RegisterUser.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        accessToken: string;
    }>;
    register(userInfo: RegisterUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
