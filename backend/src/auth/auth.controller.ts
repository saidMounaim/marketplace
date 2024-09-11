import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  register(@Body() userInfo: RegisterUserDto) {
    return this.authService.register(userInfo);
  }
}
