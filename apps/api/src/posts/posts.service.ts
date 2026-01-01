// posts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(content: string, userId: string) {
    return this.prisma.post.create({
      data: {
        content,
        authorId: userId,
      },
    });
  }

  async findAll() {
  return this.prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true, // only include username
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  }
}
