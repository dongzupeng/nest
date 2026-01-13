import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './post.entity';

/**
 * 文章控制器
 * 处理文章相关的HTTP请求
 */
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 获取所有文章
   * @returns 文章列表
   */
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  /**
   * 根据ID获取文章
   * @param id 文章ID
   * @returns 文章对象
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(+id);  // 将字符串ID转换为数字
  }

  /**
   * 创建文章
   * @param req 请求对象，包含当前登录用户信息
   * @param createPostDto 创建文章数据
   * @returns 创建的文章对象
   */
  @Post()
  @UsePipes(new ValidationPipe())  // 使用验证管道，验证请求数据
  create(@Request() req, @Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    // 从请求对象中获取当前登录用户作为作者
    return this.postService.create(req.user, createPostDto);
  }

  /**
   * 更新文章信息
   * @param id 文章ID
   * @param updatePostDto 更新文章数据
   * @returns 更新后的文章对象
   */
  @Put(':id')
  @UsePipes(new ValidationPipe())  // 使用验证管道，验证请求数据
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postService.update(+id, updatePostDto);  // 将字符串ID转换为数字
  }

  /**
   * 删除文章
   * @param id 文章ID
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(+id);  // 将字符串ID转换为数字
  }
}
