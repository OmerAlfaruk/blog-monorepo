import { P } from '@faker-js/faker/dist/airline-DF6RqYmq';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({nullable: true})
  bio?: string;


  @Field({nullable: true})
  avatar?: string;

  @Field( {nullable: true})
  password?: string;

  @Field(() => [Post])
  posts?: Post[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
