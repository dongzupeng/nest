import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

/**
 * 创建用户数据传输对象
 * 用于验证和传递用户创建请求的数据
 */
export class CreateUserDto {
  /**
   * 用户名
   * 字符串类型，长度2-100个字符
   */
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  username: string;

  /**
   * 电子邮箱
   * 符合电子邮箱格式，最长100个字符
   */
  @IsEmail()
  @MaxLength(100)
  email: string;

  /**
   * 密码
   * 字符串类型，长度6-255个字符
   */
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  /**
   * 名字
   * 可选字段，字符串类型，最长100个字符
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  /**
   * 姓氏
   * 可选字段，字符串类型，最长100个字符
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;
}