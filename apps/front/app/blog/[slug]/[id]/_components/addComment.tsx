"use client"
import { Session } from "inspector/promises";
import CommentForm from "./commentForm";
import { Dialog , DialogTrigger, DialogPortal, DialogOverlay,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/SubmitButton";
import { createComment } from "@/lib/actions/commentAction";
import { use, useActionState, useEffect } from "react";
import { toast } from "sonner"

type SessionUser = {
    id: string;
    name: string;
    email: string;
    image?: string;
};
type Props={
    postId:number,
    user:SessionUser,
    className?:string
}
const   AddComment=(props:Props)=>{
    const [state, action] = useActionState(createComment, undefined);
        
        console.log('Current state:', state);


        useEffect(() => {
          state?.ok && toast.success("Comment added")
          state?.error && toast.error('oops something went wrong')
        }, [state]);

    
    return (

        <Dialog open={state?.open}>
            <DialogTrigger className="text-sm text-slate-500">
              Leave your comment
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                   
                        <DialogTitle>Add comment</DialogTitle>  
                    
                    <form action={action} className={cn(props.className)} >
                        <input name="postId" type="hidden" value={props.postId} />
                        <label htmlFor="content">Your comment</label>
                        <Textarea name="content" id="content" className="w-full"/>
   
                        <p>
                            <span>
                                write as 
                                <span className="font-bold">{props.user.name}</span>
                            </span>
                        </p>
                        <SubmitButton >Submit</SubmitButton>
                    </form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}

export default AddComment;