import { Injectable } from '@nestjs/common';
import { NotesDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}
  async saveNote(userId: number, body: NotesDto) {
    await this.prisma.notes.create({ data: { userId, ...body } });
    return { message: 'note saved', success: true };
  }
}
