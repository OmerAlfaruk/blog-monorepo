import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Injectable()
export class LikeService {

 

  constructor(private readonly prismaService:PrismaService) {}
 async likePost({
    postId,userId
  }:{postId: number, userId: number}) {

    try{

      return !!await this.prismaService.like.create({
        data:{
          postId,userId
        }
      })




    }catch(e){
      throw new BadRequestException("Post already liked");

      
    }

     
    
  }


   async unLikPost({
    postId,userId
  }:{postId: number, userId: number}) {

    try{

      return !!await this.prismaService.like.delete({
        where:{
          userId_postId:{userId,postId}
        }
      })




    }catch(e){
      throw new BadRequestException("Post already unliked");

      
    }

     
    
  }


   async likeCount(postId: number) {
    return await this.prismaService.like.count({
      where: {
        postId,
      },
    });
  }

    async userLikedPost({ postId, userId }: { postId: number; userId: number; }) {
    const like=await this.prismaService.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    return !!like;
  }

  
}
