import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../user/user.entity';

/**
 * 文章服务类
 * 处理文章相关的业务逻辑
 */
@Injectable()
export class PostService {
  constructor(
    /**
     * 文章仓库
     * 用于数据库操作
     */
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  /**
   * 创建文章
   * @param author 文章作者
   * @param createPostDto 创建文章数据
   * @returns 创建的文章对象
   */
  async create(author: User, createPostDto: CreatePostDto): Promise<Post> {
    // 创建文章对象并关联作者
    const post = this.postRepository.create({
      ...createPostDto,
      author,
    });
    // 保存文章到数据库
    return this.postRepository.save(post);
  }

  /**
   * 获取所有文章
   * @returns 文章列表，包含作者信息
   */
  async findAll(): Promise<Post[]> {
    // 查询所有文章并加载作者关联
    return this.postRepository.find({ relations: ['author'] });
  }

  /**
   * 根据ID获取文章
   * @param id 文章ID
   * @returns 文章对象，包含作者信息
   * @throws NotFoundException 如果文章不存在
   */
  async findOne(id: number): Promise<Post> {
    // 查询文章并加载作者关联
    const post = await this.postRepository.findOne({ 
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`ID为${id}的文章不存在`);
    }
    return post;
  }

  /**
   * 更新文章信息
   * @param id 文章ID
   * @param updatePostDto 更新文章数据
   * @returns 更新后的文章对象
   * @throws NotFoundException 如果文章不存在
   */
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    // 查找文章是否存在
    const post = await this.findOne(id);
    // 合并更新数据
    Object.assign(post, updatePostDto);
    // 保存更新到数据库
    return this.postRepository.save(post);
  }

  /**
   * 删除文章
   * @param id 文章ID
   * @throws NotFoundException 如果文章不存在
   */
  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID为${id}的文章不存在`);
    }
  }
}
