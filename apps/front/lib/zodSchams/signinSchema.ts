import { z } from "zod";


export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8,{message:"Please Enter Your Correct Password"})

})