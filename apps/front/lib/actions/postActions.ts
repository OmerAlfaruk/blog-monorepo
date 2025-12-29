"use server"

import { authFetchGraphQl, fetchGraphQl } from "../fetchGraphQL"
import {print} from "graphql"
import { CREATE_POST_MUTATION, GET_POSTS, GET_POSTS_BY_ID, GET_USER_POSTS } from "../gqlQueries"
import { trasformTakeSkip } from "../helper"
import { Post } from "../types/moduleTypes"
import { PostFormState } from "../types/formState"
import { PostFormSchema } from "../zodSchams/postFormSchema"
import { object } from "zod"

export const fetchPosts=async({page,pageSize}:{page?:number,pageSize?:number})=>{

    const {skip,take}=trasformTakeSkip({page,pageSize})
    const data= await fetchGraphQl(print(GET_POSTS),{skip,take});



    return {posts:data.posts as Post[],totalposts:data.postCount as number};
}


export const fetchPostById=async (id:number)=>{
    const data= await fetchGraphQl(print(GET_POSTS_BY_ID), {id});

    return data.getpostById as Post
    

  
}


export const getUserPosts= async({page,pageSize}:{page?:number,pageSize?:number})=>{

     const {skip,take}=trasformTakeSkip({page,pageSize})

     const data= await authFetchGraphQl(print(GET_USER_POSTS),{
        take,skip
     }) 

     return {posts:data.getUserPost as Post[],totalposts:data.userPostCount as number}


}


export async function seveNewPost(state:PostFormState,formData:FormData):Promise<PostFormState>{

    const validatedFields=PostFormSchema.safeParse(Object.fromEntries(formData.entries()))
     if(!validatedFields.success){
        return {
            data:Object.fromEntries(formData.entries()),
            error:validatedFields.error.flatten().fieldErrors

        }}

        // Todo: Upload Thumnail to supabase
        const thumbnailUrl="";

        // Todo: call graph ql api

        try {
            const result = await authFetchGraphQl(print(CREATE_POST_MUTATION), {
                createPostInput: {
                    ...validatedFields.data,
                    thumbnail:thumbnailUrl
                }
            });
            
            console.log('GraphQL response:', result);
            
            return {
                data: {},
                error: {},
                ok: true,
                
                message: "Post created successfully"
            }
        } catch (error: any) {
            console.error('Request failed:', error);
            return {
                data: Object.fromEntries(formData.entries()),
                error: {},
                ok: false,
                
                message: error.message || "Network error occurred"
            }
        }
     }

