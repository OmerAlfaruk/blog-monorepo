import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  
  constructor(private readonly prismaService:PrismaService) {}
  

  getPostCommets({
    postId,
    take ,
    skip
  }:{
    postId: number,
    take?: number,
    skip?: number}) {
    return this.prismaService.comment.findMany({
      where:{postId},
      include:{
        author:true
      },
      orderBy:{
        createdAt:'desc'
      },
      take:take??DEFAULT_PAGE_SIZE,
      skip:skip??0
    });
  }
count({ postId }: {  postId: number; }) {
    return this.prismaService.comment.count({
      where: {
        postId,
      },
    });
  }



  async create(createCommentInput: CreateCommentInput,authorId:number) {
    return await this.prismaService.comment.create({
      data: {
        content:createCommentInput.content,

        post: {
          connect: {
            id: createCommentInput.postId,
          },
        },
        
        author: {
          connect: {
            id: authorId,
          },
        },
      },
      
    });
  }

 
}
