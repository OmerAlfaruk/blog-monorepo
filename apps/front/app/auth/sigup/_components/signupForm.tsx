"use client"

import SubmitButton from "@/components/SubmitButton"


const SignUpForm=()=>{
    return(
        <form action="" className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Name" className="border p-2 rounded-md" />
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="example@gmail.com" className="border p-2 rounded-md" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password"  className="border p-2 rounded-md" />
        <SubmitButton className="bg-sky-500">Sign Up</SubmitButton>
        </form>
    )
}
export default SignUpForm