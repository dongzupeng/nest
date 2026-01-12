import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Request() req, @Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(req.user, createPostDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(+id);
  }
}
