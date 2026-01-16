import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    // 配置模块，根据NODE_ENV加载相应的.env文件
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env',
      ],
      isGlobal: true,  // 全局可用
    }),
    // TypeORM数据库配置，使用环境变量
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',           // 数据库类型
        host: configService.get('DB_HOST'),       // 数据库主机
        port: +configService.get('DB_PORT'),      // 数据库端口
        username: configService.get('DB_USERNAME'), // 数据库用户名
        password: configService.get('DB_PASSWORD'), // 数据库密码
        database: configService.get('DB_DATABASE'), // 数据库名称
        entities: [__dirname + '/**/*.entity{.ts,.js}'],  // 实体文件路径
        synchronize: process.env.NODE_ENV === 'development', // 仅开发环境自动同步
      }),
      inject: [ConfigService],
    }),
    UserModule,   // 用户模块
    AuthModule,   // 认证模块
    PostModule,   // 文章模块
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
