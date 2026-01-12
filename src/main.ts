import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 应用全局中间件
  app.use((req, res, next) => new LoggerMiddleware().use(req, res, next));

  
  // 应用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // 启用CORS
  app.enableCors();
  
  // 设置全局JWT认证守卫
  const reflector = app.get('Reflector');
  const { JwtAuthGuard } = await import('./auth/guards/jwt-auth.guard.js');
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
