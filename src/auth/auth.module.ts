import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

/**
 * 认证模块
 * 包含认证相关的控制器、服务和策略
 */
@Module({
  imports: [
    // 导入UserModule以支持用户验证
    UserModule,
    // 导入PassportModule以支持身份验证
    PassportModule,
    // 导入ConfigModule以支持环境变量
    ConfigModule,
    // 配置JwtModule，使用环境变量
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),  // 从环境变量获取JWT密钥
        signOptions: { 
          expiresIn: configService.get('JWT_EXPIRES_IN'),  // 从环境变量获取令牌有效期
        },
      }),
      inject: [ConfigService],
    }),
  ],
  // 声明认证控制器
  controllers: [AuthController],
  // 声明认证服务和JWT策略
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
