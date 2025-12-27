"use server";

import { authFetchGraphQl, fetchGraphQl } from "../fetchGraphQL";
import { CREATE_COMMENT, GET_COMMENTS } from "../gqlQueries";
import { print } from "graphql";
import {CommentEntity} from "../types/moduleTypes"
import {  CommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchams/commentSchema";

export async function getPostCommets({postId,take,skip}:{
    postId: number,
    take?: number,
    skip?: number}) {
    console.log('Fetching comments for postId:', postId, 'take:', take, 'skip:', skip);
    
    try {
        const data = await fetchGraphQl(print(GET_COMMENTS),{
            postId,
            take,
            skip
        });
        
        console.log('GraphQL response:', data);
        
        return {
            comments: data.getPostCommets as CommentEntity[],
            totalcomments: data.postCommentCount as number
        }
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

export async function createComment(state: CommentFormState | undefined, formData: FormData): Promise<CommentFormState> {
   
    console.log('formData entries:', Object.fromEntries(formData.entries()));
    
    const validatedFields = CommentFormSchema.safeParse(Object.fromEntries(formData.entries()));
    
    if (!validatedFields.success) {
        
        return {
            data: Object.fromEntries(formData.entries()),
            error: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed"
        }
    }

    console.log('Validated data:', validatedFields.data);
  
    
    try {
        const result = await authFetchGraphQl(print(CREATE_COMMENT), {
            input: {
                ...validatedFields.data,
            }
        });
        
        console.log('GraphQL response:', result);
        
        return {
            data: {},
            error: {},
            ok: true,
            open: false,
            message: "Comment created successfully"
        }
    } catch (error: any) {
        console.error('Request failed:', error);
        return {
            data: Object.fromEntries(formData.entries()),
            error: {},
            ok: false,
            open: true,
            message: error.message || "Network error occurred"
        }
    }
}


