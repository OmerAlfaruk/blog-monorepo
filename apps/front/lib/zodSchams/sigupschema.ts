import { z } from "zod";


export const SigUpFormSchema = z.object({
    name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8).regex(/[a-zA-Z]/,{
    message:"password one letter"
}).regex(/[0-9]/,{
    message:"password one number"
}).regex(/[^a-zA-Z0-9]/,{
    message:"password one special character"
}),

})