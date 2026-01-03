import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  content?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  excerpt?: string;
}