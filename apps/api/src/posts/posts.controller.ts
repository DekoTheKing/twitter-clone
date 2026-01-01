import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: any) {
    // req.user.userId comes from JwtStrategy.validate
    return this.postsService.create(dto.content, req.user.userId);
  }
  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
