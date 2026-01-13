import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

/**
 * 文章实体类
 * 映射数据库中的posts表
 */
@Entity('posts')
export class Post {
  /**
   * 文章ID
   * 主键，自动生成
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 文章标题
   * 最长255个字符
   */
  @Column({ type: 'varchar', length: 255 })
  title: string;

  /**
   * 文章内容
   * 文本类型，可以存储大量内容
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * 文章摘要
   * 可选字段，最长255个字符
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  excerpt?: string;

  /**
   * 文章作者
   * 多对一关系，关联到User实体
   */
  @ManyToOne(() => User, (user) => user.id)
  author: User;

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