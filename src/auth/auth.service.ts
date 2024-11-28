import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return { message: 'user signed in', success: true };
  }
  signup() {
    return { message: 'user signed up', success: true };
  }
}
