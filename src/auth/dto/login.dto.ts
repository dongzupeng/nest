import { IsString, MinLength, MaxLength } from 'class-validator';

/**
 * 登录数据传输对象
 * 用于验证和传递用户登录请求的数据
 */
export class LoginDto {
  /**
   * 用户名
   * 字符串类型，长度2-100个字符
   */
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  username: string;

  /**
   * 密码
   * 字符串类型，长度6-255个字符
   */
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}