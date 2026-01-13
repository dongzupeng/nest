import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * 日志中间件
 * 用于记录HTTP请求和响应信息
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * 中间件处理函数
   * @param req 请求对象
   * @param res 响应对象
   * @param next 下一个中间件或路由处理函数
   */
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body } = req;
    // 记录请求方法和URL
    console.log(`[REQUEST] ${method} ${url}`);
    
    // 记录请求体（排除密码等敏感信息）
    if (body && Object.keys(body).length > 0) {
      const sanitizedBody = { ...body };
      // 隐藏密码等敏感信息
      if (sanitizedBody.password) {
        sanitizedBody.password = '[REDACTED]';
      }
      console.log(`[REQUEST BODY] ${JSON.stringify(sanitizedBody)}`);
    }
    
    // 记录请求开始时间
    const startTime = Date.now();
    
    // 监听响应完成事件，记录响应信息
    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // 根据响应状态码和请求方法生成状态提示信息
      let statusMessage = '';
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // 成功请求
        switch (method) {
          case 'GET':
            statusMessage = ' - Fetch successful';
            break;
          case 'POST':
            statusMessage = ' - Create successful';
            break;
          case 'PUT':
          case 'PATCH':
            statusMessage = ' - Update successful';
            break;
          case 'DELETE':
            statusMessage = ' - Delete successful';
            break;
          default:
            statusMessage = ' - Success';
        }
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        // 重定向请求
        statusMessage = ' - Redirected';
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        // 客户端错误
        statusMessage = ' - Client error';
      } else if (res.statusCode >= 500) {
        // 服务器错误
        statusMessage = ' - Server error';
      }
      
      // 记录响应状态码、处理时间和状态信息
      console.log(`[RESPONSE] ${res.statusCode} ${duration}ms${statusMessage}`);
    });
    
    // 调用下一个中间件或路由处理函数
    next();
  }
}