import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

/**
 * 应用程序根模块
 * 配置数据库连接和导入功能模块
 */
@Module({
  imports: [
    // TypeORM数据库配置
    TypeOrmModule.forRoot({
      type: 'mysql',           // 数据库类型
      host: 'localhost',       // 数据库主机
      port: 3306,              // 数据库端口
      username: 'root',        // 数据库用户名
      password: '123456',      // 数据库密码
      database: 'nest_db',     // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  // 实体文件路径
      synchronize: true,       // 自动同步数据库模式
    }),
    UserModule,   // 用户模块
    AuthModule,   // 认证模块
    PostModule,   // 文章模块
  ],
  controllers: [AppController],  // 应用控制器
  providers: [AppService],       // 应用服务
})
export class AppModule {}
