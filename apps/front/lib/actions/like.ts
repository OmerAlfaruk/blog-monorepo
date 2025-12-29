import { authFetchGraphQl } from "../fetchGraphQL";
import { print } from "graphql";
import {  LIKE_POST ,LIKE_POST_MUTATION,UNLIKE_POST_MUTATION} from "../gqlQueries";
import { Post } from "../types/moduleTypes";

export async function getPostLikeData(postId:number){
    const data= await authFetchGraphQl(print(LIKE_POST), {postId:postId});
    return {
        likeCount:data.likeCount,
        userLikedPost:data.userLikedPost
    }
}

export async function likePost(postId:number){
    const data= await authFetchGraphQl(print(LIKE_POST_MUTATION), {postId:postId});
  
   
}
export async function unLikePost(postId:number){
    const data= await authFetchGraphQl(print(UNLIKE_POST_MUTATION), {postId:postId});
    

}