import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { NotesService } from './notes.service';
import { NotesDto } from './dto';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  @Post('save')
  saveNote(@GetUser('id') userId: number, @Body() body: NotesDto) {
    return this.notesService.saveNote(userId, body);
  }

  @Patch('update')
  updateNote(@GetUser('id') userId: number, @Body() body: NotesDto) {
    return this.notesService.updateNote(userId, body);
  }

  @Get('getAll')
  getAll(@GetUser('id') userId: number) {
    return this.notesService.getAll(userId);
  }
}
