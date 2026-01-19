import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * 用户服务类
 * 处理用户相关的业务逻辑
 */
@Injectable()
export class UserService {
  constructor(
    /**
     * 用户仓库
     * 用于数据库操作
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 创建新用户
   * @param createUserDto 创建用户数据
   * @returns 创建的用户对象
   * @throws ConflictException 如果用户名或邮箱已存在
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名是否已存在
    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUserByUsername) {
      throw new ConflictException('用户名已存在');
    }

    // 检查电子邮件是否已存在
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('电子邮件已存在');
    }

    // 对密码进行加密处理
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // 创建用户对象
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    // 保存用户到数据库
    return this.userRepository.save(user);
  }

  /**
   * 获取所有用户（支持分页）
   * @param page 页码，默认值：1
   * @param limit 每页数量，默认值：10
   * @returns 用户列表和分页信息
   */
  async findAll(page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    // 计算偏移量
    const offset = (page - 1) * limit;
    
    // 查询数据并获取总数
    const [data, total] = await this.userRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    
    // 返回分页结果
    return {
      data,
      total,
      page,
      limit,
    };
  }

  /**
   * 根据ID获取用户
   * @param id 用户ID
   * @returns 用户对象
   * @throws NotFoundException 如果用户不存在
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`ID为${id}的用户不存在`);
    }
    return user;
  }

  /**
   * 根据用户名获取用户
   * @param username 用户名
   * @returns 用户对象或undefined
   */
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user ?? undefined;
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param updateUserDto 更新用户数据
   * @returns 更新后的用户对象
   * @throws NotFoundException 如果用户不存在
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // 查找用户是否存在
    const user = await this.findOne(id);
    // 如果更新了密码，需要重新加密
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    // 合并更新数据
    Object.assign(user, updateUserDto);
    // 保存更新到数据库
    return this.userRepository.save(user);
  }

  /**
   * 删除用户
   * @param id 用户ID
   * @throws NotFoundException 如果用户不存在
   */
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID为${id}的用户不存在`);
    }
  }
}
