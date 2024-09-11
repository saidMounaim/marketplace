import { LoginDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ email, password }: LoginDto): Promise<{
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
