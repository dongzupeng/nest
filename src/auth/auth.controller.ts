import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';

/**
 * 认证控制器
 * 处理用户登录和注册的HTTP请求
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户登录
   * @param loginDto 登录数据
   * @returns 登录结果，包含JWT令牌和用户信息
   */
  @Post('login')
  @Public()  // 使用@Public装饰器，标记为公开接口
  @UsePipes(new ValidationPipe())  // 使用验证管道，验证请求数据
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * 用户注册
   * @param createUserDto 注册数据
   * @returns 注册结果，包含JWT令牌和用户信息
   */
  @Post('register')
  @Public()  // 使用@Public装饰器，标记为公开接口
  @UsePipes(new ValidationPipe())  // 使用验证管道，验证请求数据
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
