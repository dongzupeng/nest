import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => new LoggerMiddleware().use(req, res, next));
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // 全局注册响应拦截器，统一响应格式
  app.useGlobalInterceptors(new ResponseInterceptor());
  
  app.enableCors();
  
  // 设置全局JWT认证守卫
  const reflector = app.get('Reflector');
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
