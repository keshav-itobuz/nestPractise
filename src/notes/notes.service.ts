import { Injectable } from '@nestjs/common';
import { NotesDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/global-filters/customErrorFilter';
import { PrismaErrors } from 'src/global-filters/prismaErrorFilter';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}
  async saveNote(userId: number, body: NotesDto) {
    try {
      await this.prisma.notes.create({
        data: { userId, title: body.title, description: body.description },
      });
      return { message: 'note saved', success: true };
    } catch (error) {
      return { message: error.message, success: false };
    }
  }

  async updateNote(userId: number, body: NotesDto) {
    try {
      await this.prisma.notes.update({
        where: { userId, id: body.id },
        data: { title: body.title, description: body.description },
      });
      return { message: 'note updated', success: true };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new CustomError(PrismaErrors.P2025, 'Error: Note not found.');
      } else {
        return { message: error.message, success: true };
      }
    }
  }

  async getAll(userId: number) {
    return this.prisma.notes.findMany({ where: { userId } });
  }

  async deleteNote(userId: number, id: number) {
    try {
      await this.prisma.notes.delete({
        where: { userId, id },
      });
      return { message: 'note deleted', success: true };
    } catch (error) {
      if (error.code === 'P2025') {
        return {
          message: 'Error: Note not found or already deleted.',
          success: true,
        };
      } else {
        return { message: error.message, success: true };
      }
    }
  }
}
