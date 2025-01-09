import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class NotesDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
