import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body } = req;
    console.log(`[REQUEST] ${method} ${url}`);
    
    // 记录请求体（排除密码等敏感信息）
    if (body && Object.keys(body).length > 0) {
      const sanitizedBody = { ...body };
      if (sanitizedBody.password) {
        sanitizedBody.password = '[REDACTED]';
      }
      console.log(`[REQUEST BODY] ${JSON.stringify(sanitizedBody)}`);
    }
    
    const startTime = Date.now();
    
    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // 为所有请求添加状态提示信息
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
      
      console.log(`[RESPONSE] ${res.statusCode} ${duration}ms${statusMessage}`);
    });
    
    next();
  }
}