"use client"

import { Textarea } from "@/components/ui/textarea";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import SubmitButton from "@/components/SubmitButton";
import { PostFormState } from "@/lib/types/formState";
import { toast } from "sonner";


type Props={
    

    state:PostFormState,
    formAction:(payload:FormData)=>void;
    
}
const UpSertForm = (props:Props) => {

    const [imageUrl, setImageUrl] = useState("");
    
    useEffect(() => {
        console.log('Form state changed:', props.state);
        if (props.state?.ok) {
            toast.success(props.state.message || "Success");
        } else if (props.state?.message) {
            toast.error(props.state.message);
        }
    }, [props.state]);
    return (
       <form action={props.formAction} className="flex flex-col gap-3 [&>div>label]:text-slate-500 [&>div>label]:mb-2 [&>div>input]:transition [&>div>textarea]:transition [&>div]:flex [&>div]:gap-2  items-start [&>div]:w-full " >
        <div className="flex flex-col">
            <label htmlFor="title">Title  </label>
            <input type="text" id="title" name="title" placeholder="Enter The Title of Your Post" className = "mb-2 p-2 border border-gray-300 rounded-md" defaultValue={props.state?.data?.title}/>
        </div>

        {!!props.state?.error?.title && <p className="text-red-400">{props.state.error.title}</p>}
        <div className="flex flex-col">
            <label htmlFor="content">Content  </label>
           <Textarea id="content" name="content" placeholder="Write Your Post Content Here" rows={6} className="min-h-32" defaultValue={props.state?.data?.content}/>
           
        </div>
        {!!props.state?.error?.content && <p className="text-red-400">{props.state.error.content}</p>}
        <div className="flex flex-col">
            <label htmlFor="thumbnail ">Image  </label>
            <input type="file" id="image" name="thumbnail" accept="image/*" onChange={(e)=>{
                if(e.target.files)setImageUrl(URL.createObjectURL(e.target.files[0]))
            }}  className = " border border-gray-300 rounded-md bg-gray-200 w-60 h-7 px-4 flex items-center justify-center text-center "/>

            {!!imageUrl && (
              
                   <Image src={imageUrl} alt="image" width={200} height={150} />
                
            )}
           </div>
           {!!props.state?.error?.thumbnail && <p className="text-red-400">{props.state.error.thumbnail}</p>}
           <div className="flex flex-col">
            <label htmlFor="tags">Tags (Comma-Separated)</label>
            <input className = "mb-2 p-2 border border-gray-300 rounded-md" type="text" id="tags" name="tags" placeholder="Enter Tags for Your Post" defaultValue={props.state?.data?.tags}/>
           </div>
           {!!props.state?.error?.tags && <p className="text-red-400">{props.state.error.tags}</p>}

           <div className="items-center ">
             <input type="checkbox" name="published" id="published" className="mb-2 h-4 w-4" defaultValue={props.state?.data?.isPublished}/>
            <label htmlFor="published" className="">Publish</label>
           
            
           </div>
           {!!props.state?.error?.isPublished && <p className="text-red-400">{props.state.error.isPublished}</p>}

           <div>
            <SubmitButton>Submit</SubmitButton>
           </div>

       </form>
    );
    
}

export default UpSertForm