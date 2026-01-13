import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
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
    // 配置JwtModule
    JwtModule.register({
      secret: 'your-secret-key',  // JWT密钥，实际项目中应使用环境变量
      signOptions: { expiresIn: '1h' },  // JWT令牌有效期为1小时
    }),
  ],
  // 声明认证控制器
  controllers: [AuthController],
  // 声明认证服务和JWT策略
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
