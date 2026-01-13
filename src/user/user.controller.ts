import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

/**
 * 用户控制器
 * 处理用户相关的HTTP请求
 */
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)  // 使用类序列化拦截器，隐藏敏感字段（如密码）
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建用户
   * @param createUserDto 创建用户数据
   * @returns 创建的用户对象
   */
  @Post()
  @UsePipes(new ValidationPipe())  // 使用验证管道，验证请求数据
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * 获取所有用户
   * @returns 用户列表
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * 根据ID获取用户
   * @param id 用户ID
   * @returns 用户对象
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);  // 将字符串ID转换为数字
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param updateUserDto 更新用户数据
   * @returns 更新后的用户对象
   */
  @Put(':id')
  @UsePipes(new ValidationPipe())  // 使用验证管道，验证请求数据
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(+id, updateUserDto);  // 将字符串ID转换为数字
  }

  /**
   * 删除用户
   * @param id 用户ID
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);  // 将字符串ID转换为数字
  }
}
