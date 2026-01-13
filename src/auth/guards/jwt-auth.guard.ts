import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * JWT认证守卫
 * 用于保护需要JWT认证的接口
 * 继承自NestJS的AuthGuard('jwt')
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 检查接口是否可以激活
   * @param context 执行上下文
   * @returns 是否可以访问接口
   */
  canActivate(context: ExecutionContext) {
    // 检查接口或控制器是否有@Public装饰器
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),  // 检查方法
      context.getClass(),   // 检查类
    ]);
    if (isPublic) {
      // 如果是公开接口，直接允许访问
      return true;
    }
    // 否则应用默认的JWT认证
    return super.canActivate(context);
  }

  /**
   * 处理JWT认证结果
   * @param err 错误信息
   * @param user 用户信息
   * @param info JWT验证信息
   * @returns 认证通过的用户对象
   * @throws UnauthorizedException 如果认证失败
   */
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      // 根据info参数提供具体的错误信息
      let message = '未授权访问';
      if (info && info.name === 'TokenExpiredError') {
        message = '令牌已过期';
      } else if (info && info.name === 'JsonWebTokenError') {
        message = '令牌无效';
      } else if (info && info.name === 'TokenError') {
        message = '未提供令牌';
      } else if (!user) {
        // 如果用户不存在
        message = '用户不存在';
      }
      throw new UnauthorizedException(message);
    }
    // 认证通过，返回用户信息
    return user;
  }
}
