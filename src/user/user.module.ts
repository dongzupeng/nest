import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

/**
 * 用户模块
 * 包含用户相关的控制器、服务和实体
 */
@Module({
  imports: [
    // 导入TypeOrmModule并注册User实体
    TypeOrmModule.forFeature([User])
  ],
  // 声明用户控制器
  controllers: [UserController],
  // 声明用户服务
  providers: [UserService],
  // 导出UserService，供其他模块使用（如Auth模块）
  exports: [UserService],
})
export class UserModule {}
