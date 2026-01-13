import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

/**
 * 更新文章数据传输对象
 * 用于验证和传递文章更新请求的数据
 */
export class UpdatePostDto {
  /**
   * 文章标题
   * 可选字段，字符串类型，长度3-255个字符
   */
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  title?: string;

  /**
   * 文章内容
   * 可选字段，字符串类型，至少10个字符
   */
  @IsString()
  @MinLength(10)
  @IsOptional()
  content?: string;

  /**
   * 文章摘要
   * 可选字段，字符串类型，最长255个字符
   */
  @IsString()
  @MaxLength(255)
  @IsOptional()
  excerpt?: string;
}