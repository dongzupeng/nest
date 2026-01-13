import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { UserModule } from '../user/user.module';

/**
 * 文章模块
 * 包含文章相关的控制器、服务和实体
 */
@Module({
  imports: [
    // 导入TypeOrmModule并注册Post实体
    TypeOrmModule.forFeature([Post]),
    // 导入UserModule以支持作者关联
    UserModule
  ],
  // 声明文章控制器
  controllers: [PostController],
  // 声明文章服务
  providers: [PostService],
})
export class PostModule {}
