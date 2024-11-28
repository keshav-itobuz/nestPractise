import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: AuthDto) {
    console.log(body);
    return this.authService.signup();
  }

  SignIn() {
    return this.authService.signin();
  }
}
