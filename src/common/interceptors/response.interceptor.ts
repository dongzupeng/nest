import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 响应接口
 * 定义统一的API响应格式
 */
interface Response<T> {
  code: number;     // 响应状态码
  message: string;  // 响应消息
  data: T;          // 响应数据
}

/**
 * 响应拦截器
 * 用于统一处理API响应格式
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  /**
   * 拦截并处理API响应
   * @param context 执行上下文
   * @param next 调用处理器
   * @returns 格式化后的响应
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const method = context.switchToHttp().getRequest().method;
    let successMessage = '操作成功';

    // 根据HTTP方法设置默认的成功消息
    switch (method) {
      case 'GET':
        successMessage = '获取成功';
        break;
      case 'POST':
        successMessage = '创建成功';
        break;
      case 'PUT':
      case 'PATCH':
        successMessage = '更新成功';
        break;
      case 'DELETE':
        successMessage = '删除成功';
        break;
    }

    return next.handle().pipe(
      map(data => {
        // 如果返回的数据已经包含了message字段，使用它；否则使用默认消息
        const message = data?.message || successMessage;
        // 如果返回的数据已经包含了code字段，使用它；否则使用200
        const code = data?.code || 200;
        
        // 如果返回的数据已经是标准格式，直接返回
        if (data && data.code && data.message && data.data) {
          return data;
        }
        
        // 检查是否是分页查询结果（包含total、page、limit字段）
        if (data && data.data && typeof data.total === 'number' && typeof data.page === 'number' && typeof data.limit === 'number') {
          // 保留分页信息，构造包含分页数据的响应
          return {
            code,
            message,
            ...data, // 保留data、total、page、limit
          };
        }

        // 否则，构造标准格式的响应
        return {
          code,
          message,
          data: data?.data || data,
        };
      })
    );
  }
}
