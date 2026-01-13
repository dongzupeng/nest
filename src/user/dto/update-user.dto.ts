import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

/**
 * 更新用户数据传输对象
 * 用于验证和传递用户更新请求的数据
 */
export class UpdateUserDto {
  /**
   * 用户名
   * 可选字段，字符串类型，长度3-100个字符
   */
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  username?: string;

  /**
   * 电子邮箱
   * 可选字段，符合电子邮箱格式，最长100个字符
   */
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email?: string;

  /**
   * 密码
   * 可选字段，字符串类型，长度6-255个字符
   */
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @IsOptional()
  password?: string;

  /**
   * 名字
   * 可选字段，字符串类型，最长100个字符
   */
  @IsString()
  @MaxLength(100)
  @IsOptional()
  firstName?: string;

  /**
   * 姓氏
   * 可选字段，字符串类型，最长100个字符
   */
  @IsString()
  @MaxLength(100)
  @IsOptional()
  lastName?: string;
}