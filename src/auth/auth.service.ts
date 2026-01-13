import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

/**
 * 认证服务类
 * 处理用户登录和注册的业务逻辑
 */
@Injectable()
export class AuthService {
  constructor(
    /**
     * 用户服务
     * 用于用户数据操作
     */
    private userService: UserService,
    /**
     * JWT服务
     * 用于生成和验证JWT令牌
     */
    private jwtService: JwtService,
  ) {}

  /**
   * 验证用户凭据
   * @param username 用户名
   * @param password 密码
   * @returns 验证通过的用户对象
   * @throws UnauthorizedException 如果凭据无效
   */
  async validateUser(username: string, password: string): Promise<User> {
    // 根据用户名查找用户
    const user = await this.userService.findByUsername(username);
    // 验证密码是否匹配（使用bcrypt比较哈希值）
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('用户名或密码错误');
  }

  /**
   * 用户登录
   * @param loginDto 登录数据
   * @returns 登录结果，包含JWT令牌和用户信息
   */
  async login(loginDto: LoginDto) {
    // 验证用户凭据
    const user = await this.validateUser(loginDto.username, loginDto.password);
    // 创建JWT负载
    const payload = { username: user.username, sub: user.id };
    return {
      message: '登录成功',
      access_token: this.jwtService.sign(payload),  // 生成JWT令牌
      user: {
        // 返回用户信息（不包含密码）
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  /**
   * 用户注册
   * @param createUserDto 注册数据
   * @returns 注册结果，包含JWT令牌和用户信息
   */
  async register(createUserDto: CreateUserDto) {
    // 创建新用户
    const user = await this.userService.create(createUserDto);
    // 创建JWT负载
    const payload = { username: user.username, sub: user.id };
    return {
      message: '注册成功',
      access_token: this.jwtService.sign(payload),  // 生成JWT令牌
      user: {
        // 返回用户信息（不包含密码）
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
