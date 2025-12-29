import { Injectable, Post } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class PostService {
 
  
constructor(private prisma: PrismaService) {}

  async findAll({skip=0,take=DEFAULT_PAGE_SIZE}:{skip?:number,take?:number}){
    //return `This action returns all post`;
    return await this.prisma.post.findMany({
      skip,take,}
    );
  }

  async count(){
    return await this.prisma.post.count();
  }

  async findOne(id:number){
    return await this.prisma.post.findUnique({
      where:{id},include:{author:true,tags:true}
    })
  }

  async findPostByUser({userId,skip,take}:{userId: number, skip: number, take: number}) {
    return await this.prisma.post.findMany({
     where:{

      author:{
        id:userId
      }

       
      },
      select:{
        id:true,
        content:true,
        createdAt:true,
        published:true,
        slug:true,
        title:true,
        thumbnail:true,
        _count:{
          select:{
            comments:true,
            likes:true
          }
        }

      }
      ,
      take,skip
    })
  }
   async userPostCount(userId: number) {

    return await this.prisma.post.count({
      where:{
        author:{
          id:userId
        }
      }
    })
   
  }

  async createPost({
    createPostInput,
    userId
   }:{createPostInput: CreatePostInput, userId: number}) {
   
   // Generate slug from title
   const slug = createPostInput.title
     .toLowerCase()
     .replace(/[^a-z0-9]+/g, '-')
     .replace(/(^-|-$)/g, '');
   
   return await this.prisma.post.create({
    data:{
      ...createPostInput,
      slug,
      author:{
        connect:{
          id:userId
        }
      },
      tags:{
        connectOrCreate:createPostInput.tags.map((tag)=>({
          where:{
            name:tag
          },
          create:{
            name:tag
          }
        }))
      }
    }
   })
  }


}
