import { Injectable } from '@nestjs/common';

/**
 * 应用程序根服务
 * 提供基础的应用功能
 */
@Injectable()
export class AppService {
  /**
   * 获取欢迎信息
   * @returns 欢迎字符串
   */
  getHello(): string {
    return 'Hello World!';
  }
}
