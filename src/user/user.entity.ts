import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

/**
 * 用户实体类
 * 映射数据库中的users表
 */
@Entity('users')
export class User {
  /**
   * 用户ID
   * 主键，自动生成
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户名
   * 唯一约束，最长100个字符
   */
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  /**
   * 电子邮箱
   * 唯一约束，最长100个字符
   */
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  /**
   * 密码
   * 加密存储，最长255个字符
   * 使用@Exclude()装饰器，避免在API响应中返回
   */
  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  /**
   * 名字
   * 可选字段，最长100个字符
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  firstName: string;

  /**
   * 姓氏
   * 可选字段，最长100个字符
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName: string;

  /**
   * 创建时间
   * 自动生成
   */
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  /**
   * 更新时间
   * 自动生成
   */
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}