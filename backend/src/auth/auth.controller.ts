import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { JwtAuthGuard } from 'src/ads/jwt-auth.guard';

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

  @Post('me')
  @UseGuards(JwtAuthGuard)
  getLoggedIn(@Req() req: any) {
    const userId = req.user.id;
    return this.authService.getLoggedInUser(userId);
  }
}
