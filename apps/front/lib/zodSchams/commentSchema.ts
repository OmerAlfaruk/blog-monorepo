import { z } from "zod";


export const CommentFormSchema = z.object({

  content: z.string().min(5),
  postId:z.string().transform((value)=>parseInt(value)).refine(value=>value>0,{message:"Please Enter Your PostId"}),


})