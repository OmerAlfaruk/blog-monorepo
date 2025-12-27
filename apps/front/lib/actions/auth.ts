"use server"

import { redirect } from "next/navigation";
import { fetchGraphQl } from "../fetchGraphQL";
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from "../gqlQueries";
import { SigInFormState, SigUpFormState } from "../types/formState";
import { SigUpFormSchema } from "../zodSchams/sigupschema";
import { print } from "graphql";
import { SignInFormSchema } from "../zodSchams/signinSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";


export async function signup(state:SigUpFormState,formData:FormData):Promise<SigUpFormState> {

    const validatedFields=SigUpFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validatedFields.success){
       
        return {
            data:Object.fromEntries(formData.entries()),
            error:validatedFields.error.flatten().fieldErrors,
            message: "Validation failed"
        }

    }

        const data=await fetchGraphQl(print(CREATE_USER_MUTATION),{
            input:{
              ...validatedFields.data
            }
        })



        if(data.errors) {
            return {
                data:Object.fromEntries(formData.entries()),
                error: {},
                message: "Something went wrong"
            };
        }
        
        redirect("/auth/signin");





    
    
}


export async function signin(state:SigInFormState,formData:FormData):Promise<SigInFormState> {

    const validatedFields=SignInFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validatedFields.success){
       
        return {
            data:Object.fromEntries(formData.entries()),
            error:validatedFields.error.flatten().fieldErrors,
            message: "Validation failed"
        }

    }

        const data=await fetchGraphQl(print(SIGNIN_USER_MUTATION),{
            input:{
              ...validatedFields.data
            }
        })




        if(data.errors) {
            return {
                data:Object.fromEntries(formData.entries()),
                error: {},
                message: "Something went wrong"
            };
        }

        await createSession({
            user:{
                id:data.SignIn.id,
                avatar:data.SignIn.avatar,
                name:data.SignIn.name,
            },
            accessToken:data.SignIn.accessToken
        })
        revalidatePath('/')
        redirect('/');





    
    
}
