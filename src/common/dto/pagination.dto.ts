import { IsOptional, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * 分页参数DTO
 * 用于处理分页查询请求的参数
 */
export class PaginationDto {
  /**
   * 页码
   * 默认值：1
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page?: number;

  /**
   * 每页数量
   * 默认值：10
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit?: number;
}