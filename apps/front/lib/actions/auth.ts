"use server"

import { SigUpFormState } from "../types/moduleTypes";
import { SigUpFormSchema } from "../zodSchams/sigupschema";


export async function sinup(state:SigUpFormState,formData:FormData):Promise<SigUpFormState> {

    const validatedFields=SigUpFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validatedFields.success){
        return {
            error:validatedFields.error.flatten().fieldErrors,
            message: "Validation failed"
        }
    }





    
    
}