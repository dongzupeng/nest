import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

/**
 * 应用程序启动函数
 * 配置并启动NestJS应用
 */
async function bootstrap() {
  // 创建NestJS应用实例
  const app = await NestFactory.create(AppModule);
  
  // 注册日志中间件
  app.use((req, res, next) => new LoggerMiddleware().use(req, res, next));
  
  // 注册全局异常过滤器，统一处理HTTP异常
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // 全局注册响应拦截器，统一响应格式
  app.useGlobalInterceptors(new ResponseInterceptor());
  
  // 启用CORS
  app.enableCors();
  
  // 设置全局JWT认证守卫
  const reflector = app.get('Reflector');
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  
  // 获取ConfigService
  const configService = app.get(ConfigService);
  // 启动应用，明确指定主机为127.0.0.1（IPv4），监听环境变量PORT
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port, '127.0.0.1');
  console.log(`应用程序运行在: http://127.0.0.1:${configService.get('PORT')}`);
}

// 启动应用
bootstrap();
