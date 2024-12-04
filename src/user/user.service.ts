import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async updateUser(userId: number, body: EditUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });

    delete user.hash;
    return user;
  }
}
