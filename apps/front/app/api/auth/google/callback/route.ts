import { BACKEND_URL } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(req:NextResponse){
    const {searchParams}=new URL(req.url);
   const userId=searchParams.get('userId');
   const name=searchParams.get('name');
   const avatar=searchParams.get('avatar')
   const accessToken=searchParams.get('accessToken');

   if(!userId || !name || !accessToken){
    return NextResponse.json({message:"Google oauth failed"},{status:400})


   }

   const res=await fetch(`${BACKEND_URL}/auth/verify-token`,{
    headers:{
        Authorization:`Bearer ${accessToken}`

    }
   })

   if(res.status===401)throw new Error("Google oauth failed")


    await createSession({
        user: {
            id: userId,
            name,
            avatar: avatar ?? undefined
        },
        accessToken
    })
   
    redirect('/')

}