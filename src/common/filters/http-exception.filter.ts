import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * HTTP异常过滤器
 * 用于统一处理HTTP异常，格式化错误响应
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 捕获并处理HTTP异常
   * @param exception HTTP异常对象
   * @param host 执行上下文
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 默认错误信息和代码
    let message: string | string[] = '请求失败';
    let code = status;

    // 处理不同类型的异常响应
    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (exceptionResponse instanceof Object) {
      // 从异常响应中提取信息
      message = (exceptionResponse as any).message || message;
      code = (exceptionResponse as any).code || code;
    }

    // 格式化错误响应
    response.status(status).json({
      code,                    // 错误代码
      message,                 // 错误信息
      data: null,              // 响应数据（异常时为null）
      timestamp: new Date().toISOString(),  // 错误发生时间
      path: request.url,       // 请求路径
    });
  }
}