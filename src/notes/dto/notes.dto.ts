import { IsNotEmpty, IsString, Length } from 'class-validator';

export class NotesDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
