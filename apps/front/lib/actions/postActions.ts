"use server"

import { fetchGraphQl } from "../fetchGraphQL"
import {print} from "graphql"
import { GET_POSTS, GET_POSTS_BY_ID } from "../gqlQueries"
import { trasformTakeSkip } from "../helper"
import { Post } from "../types/moduleTypes"

export const fetchPosts=async({page,pageSize}:{page?:number,pageSize?:number})=>{

    const {skip,take}=trasformTakeSkip({page,pageSize})
    const data= await fetchGraphQl(print(GET_POSTS),{skip,take});



    return {posts:data.posts as Post[],totalposts:data.postCount as number};
}


export const fetchPostById=async (id:number)=>{
    const data= await fetchGraphQl(print(GET_POSTS_BY_ID), {id});

    return data.getpostById as Post

  
}
