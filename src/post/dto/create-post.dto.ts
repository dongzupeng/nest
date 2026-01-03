import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  excerpt?: string;
}