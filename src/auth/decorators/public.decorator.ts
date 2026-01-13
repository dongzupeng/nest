import { SetMetadata } from '@nestjs/common';

/**
 * 公开接口标识常量
 * 用于在元数据中标记接口是否为公开接口
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * 公开接口装饰器
 * 用于标记不需要JWT认证的接口
 * @returns 装饰器函数
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
