"use client"

import SubmitButton  from "@/components/SubmitButton"
import { createComment } from "@/lib/actions/commentAction"
import { Send } from "lucide-react"
import { useActionState } from "react"

type Props = {
    postId: number;
}

const CommentForm = ({ postId }: Props) => {
    console.log('CommentForm rendered with postId:', postId);
    
    const createCommentWithPostId = async (state: any, formData: FormData) => {
        console.log('Form submitted!');
        return createComment(state, formData);
    };
    
    const [state, action] = useActionState(createCommentWithPostId, undefined);
    
    console.log('Current state:', state);
    
    return(
        
            <div className=" bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
               
                
                <form action={action} className="space-y-6">
                    {!!state?.message && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-700 text-sm">{state.message}</p>
                        </div>
                    )}
                    
                    <div>
                       
                        <input 
                            name="content" 
                            type="text" 
                            placeholder="Leave a comment" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                            defaultValue={state?.data?.content} 
                        />
                        

                        </div>
                    
                    <SubmitButton className="">
                        <Send className="w-4 h-4" />
                    </SubmitButton>
                </form>
                
              
            </div>
      
    )
}
export default CommentForm