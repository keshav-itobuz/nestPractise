import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(body: AuthDto) {
    try {
      // hash password
      const hash = await argon.hash(body.password);

      //  save new user in db
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          hash,
        },
      });
      delete user.hash;
      // return user
      return { message: 'user signed up', success: true, data: user };
    } catch (error) {
      // p2002 is prisma error code for unique constraint`
      if (error.code === 'P2002') {
        throw new ForbiddenException('email already exists');
      }
      throw error;
    }
  }

  async signin(body: AuthDto) {
    // find user by mail
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // if user doesn't exist throw exception
    if (!user) {
      throw new ForbiddenException('user not found');
    }

    //match password
    const passMatch = await argon.verify(user.hash, body.password);

    //if password doesn't match throw exception
    if (!passMatch) {
      throw new ForbiddenException('password is incorrect');
    }
    delete user.hash;
    //return user
    const token = this.signToken(user.id, user.email);
    return token;
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });
    return { access_token: token };
  }
}
