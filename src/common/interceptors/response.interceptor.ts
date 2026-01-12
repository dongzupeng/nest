import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const method = context.switchToHttp().getRequest().method;
    let successMessage = 'Success';

    // 根据HTTP方法设置默认的成功消息
    switch (method) {
      case 'GET':
        successMessage = 'Fetch successful';
        break;
      case 'POST':
        successMessage = 'Create successful';
        break;
      case 'PUT':
      case 'PATCH':
        successMessage = 'Update successful';
        break;
      case 'DELETE':
        successMessage = 'Delete successful';
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
