import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 检查是否有@Public装饰器
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // 否则应用默认的JWT认证
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      // 根据info参数提供具体的错误信息
      let message = 'Unauthorized';
      if (info && info.name === 'TokenExpiredError') {
        message = 'Token has expired';
      } else if (info && info.name === 'JsonWebTokenError') {
        message = 'Invalid token';
      } else if (info && info.name === 'TokenError') {
        message = 'Token not provided';
      } else if (!user) {
        // 如果用户不存在
        message = 'User not found';
      }
      throw new UnauthorizedException(message);
    }
    return user;
  }
}
