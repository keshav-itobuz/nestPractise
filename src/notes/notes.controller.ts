import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
