import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 应用程序根控制器
 * 处理根路由请求
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET / 路由
   * 返回欢迎信息
   * @returns 欢迎字符串
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
