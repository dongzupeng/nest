<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

这是一个用于学习NestJS框架的完整项目示例，包含了后端开发的核心功能：

- 用户认证与授权（JWT）
- 数据库集成（TypeORM + MySQL）
- RESTful API设计
- 输入数据验证
- 密码安全存储
- 中间件与异常处理
- 模块化架构设计

该项目可作为学习NestJS的入门模板，帮助前端开发者快速理解后端开发的基本概念和实践。

## 项目结构

```
src/
├── app.module.ts          # 根模块
├── main.ts                # 应用入口
├── user/                  # 用户模块
│   ├── user.entity.ts     # 用户实体
│   ├── user.module.ts     # 用户模块定义
│   ├── user.controller.ts # 用户控制器
│   ├── user.service.ts    # 用户服务
│   ├── dto/               # 数据传输对象
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── user.controller.spec.ts # 控制器测试
│   └── user.service.spec.ts     # 服务测试
├── auth/                  # 认证模块
│   ├── auth.module.ts     # 认证模块定义
│   ├── auth.controller.ts # 认证控制器
│   ├── auth.service.ts    # 认证服务
│   ├── decorators/        # 装饰器
│   │   └── public.decorator.ts
│   ├── dto/               # 数据传输对象
│   │   └── login.dto.ts
│   ├── guards/            # 守卫
│   │   └── jwt-auth.guard.ts
│   ├── strategies/        # 策略
│   │   └── jwt.strategy.ts
│   ├── auth.controller.spec.ts # 控制器测试
│   └── auth.service.spec.ts     # 服务测试
├── post/                  # 文章模块
│   ├── post.entity.ts     # 文章实体
│   ├── post.module.ts     # 文章模块定义
│   ├── post.controller.ts # 文章控制器
│   ├── post.service.ts    # 文章服务
│   ├── dto/               # 数据传输对象
│   │   ├── create-post.dto.ts
│   │   └── update-post.dto.ts
│   ├── post.controller.spec.ts # 控制器测试
│   └── post.service.spec.ts     # 服务测试
└── common/                # 公共模块
    ├── filters/           # 过滤器
    │   └── http-exception.filter.ts
    ├── middleware/        # 中间件
    │   └── logger.middleware.ts
    └── interceptors/      # 拦截器
        └── response.interceptor.ts
```

## 数据库配置

项目使用MySQL数据库，配置信息位于`src/app.module.ts`：

```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nest_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // 开发环境使用，生产环境建议关闭
})
```

请确保已安装MySQL并创建名为`nest_db`的数据库。

## API端点

### 统一响应格式

所有API端点都遵循统一的响应格式：

#### 成功响应
```json
{
  "code": 200,
  "message": "操作成功",
  "data": { /* 返回的数据 */ }
}
```

#### 错误响应
```json
{
  "code": 400,
  "message": "错误信息",
  "data": null,
  "timestamp": "2026-01-13T12:34:56.789Z",
  "path": "/api/endpoint"
}
```

### JWT认证说明

本项目使用JWT（JSON Web Token）进行身份验证：

1. **获取Token**：通过登录接口（`/auth/login`）获取JWT令牌
2. **设置请求头**：在需要认证的API请求头中添加：
   ```
   Authorization: Bearer <your-token>
   ```
3. **Token有效期**：默认情况下，Token有效期为1小时
4. **Token过期处理**：当Token过期时，API会返回`{ "code": 401, "message": "Token has expired" }`
5. **公共接口**：只有登录（`/auth/login`）和注册（`/auth/register`）接口不需要认证

### 认证模块

| 方法 | 路径 | 描述 | 认证 | 请求体 |
|------|------|------|------|--------|
| POST | /auth/login | 用户登录 | 无 | `{ "username": "string", "password": "string" }` |
| POST | /auth/register | 用户注册 | 无 | `{ "username": "string", "email": "string", "password": "string", "firstName": "string", "lastName": "string" }` (firstName和lastName为可选字段) |

### 用户模块

| 方法 | 路径 | 描述 | 认证 | 请求体 |
|------|------|------|------|--------|
| GET | /user | 获取所有用户 | JWT | 无 |
| GET | /user/:id | 获取指定用户 | JWT | 无 |
| POST | /user | 创建用户 | JWT | `{ "username": "string", "email": "string", "password": "string" }` |
| PUT | /user/:id | 更新用户 | JWT | `{ "username": "string", "email": "string" }` |
| DELETE | /user/:id | 删除用户 | JWT | 无 |

### 文章模块

| 方法 | 路径 | 描述 | 认证 | 请求体 |
|------|------|------|------|--------|
| GET | /post | 获取所有文章 | 无 | 无 |
| GET | /post/:id | 获取指定文章 | 无 | 无 |
| POST | /post | 创建文章 | JWT | `{ "title": "string", "content": "string" }` |
| PUT | /post/:id | 更新文章 | JWT | `{ "title": "string", "content": "string" }` |
| DELETE | /post/:id | 删除文章 | JWT | 无 |

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## 使用说明

1. **安装依赖**：
   ```bash
   npm install
   ```

2. **配置数据库**：
   - 确保MySQL已安装并运行
   - 创建名为`nest_db`的数据库
   - 可以根据需要修改`app.module.ts`中的数据库配置

3. **启动开发服务器**：
   ```bash
   npm run start:dev
   ```

4. **测试API**：
   - 使用Postman或其他API测试工具
   - 首先注册用户：`POST http://localhost:3000/auth/register`
   - 然后登录获取JWT令牌：`POST http://localhost:3000/auth/login`
   - 使用获取的令牌访问需要认证的API端点

## 学习建议

1. **从基础开始**：先了解NestJS的核心概念（模块、控制器、服务、依赖注入）
2. **查看代码结构**：理解项目的模块化设计和文件组织
3. **跟踪请求流程**：从控制器到服务再到数据库，了解数据是如何流动的
4. **实验修改**：尝试修改代码，添加新功能，观察结果
5. **学习认证机制**：理解JWT认证的工作原理和实现方式
6. **掌握数据库操作**：学习如何使用TypeORM进行数据库查询和关系映射
7. **了解中间件和过滤器**：学习如何处理请求日志和统一错误响应

## 扩展功能

你可以尝试为这个项目添加以下功能来进一步学习NestJS：

1. 添加更多的数据关系（如文章评论、分类）
2. 实现文件上传功能
3. 添加邮件发送功能
4. 实现分页和搜索功能
5. 添加Swagger API文档
6. 实现单元测试和集成测试

通过这些练习，你将能够更深入地理解NestJS框架的使用和后端开发的最佳实践。
