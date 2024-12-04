import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('get')
  getMe(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('update')
  @UseInterceptors(FileInterceptor('file'))
  updateUser(@GetUser('id') userId: number, @Body() body: EditUserDto) {
    console.log(userId);
    return this.userService.updateUser(userId, body);
  }
}
