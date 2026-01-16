import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';

/**
 * JWT策略
 * 用于验证JWT令牌并获取用户信息
 * 继承自PassportStrategy(Strategy)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private configService: ConfigService) {
    super({
      // 从请求头的Authorization字段中提取Bearer令牌
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWT密钥，从环境变量获取
      secretOrKey: configService.get('JWT_SECRET'),
      // 不忽略令牌过期检查
      ignoreExpiration: false,
    });
  }

  /**
   * 验证JWT令牌有效载荷
   * @param payload JWT令牌的有效载荷
   * @returns 验证通过的用户对象
   * @throws UnauthorizedException 如果用户不存在
   */
  async validate(payload: { username: string }) {
    // 根据有效载荷中的用户名查找用户
    const user = await this.userService.findByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    // 返回用户信息，该信息会被添加到请求对象的user属性中
    return user;
  }
}