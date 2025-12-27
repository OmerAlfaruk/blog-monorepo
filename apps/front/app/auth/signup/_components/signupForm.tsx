"use client"

import SubmitButton  from "@/components/SubmitButton"
import { signup } from "@/lib/actions/auth"
import { useActionState } from "react"
import Link from "next/link"

const SignUpForm=()=>{
    const [state,action]=useActionState(signup, undefined)
    
    return(
        
            <div className=" bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-600">Join us today</p>
                </div>
                
                <form action={action} className="space-y-6">
                    {!!state?.message && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-700 text-sm">{state.message}</p>
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input 
                            name="name" 
                            type="text" 
                            placeholder="Enter your name" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                            defaultValue={state?.data?.name} 
                        />
                        {!!state?.error?.name && <p className="text-red-500 text-sm mt-1">{state.error.name}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                            defaultValue={state?.data?.email}
                        />
                        {!!state?.error?.email && <p className="text-red-500 text-sm mt-1">{state.error.email}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="Create a password" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                            defaultValue={state?.data?.password} 
                        />
                        {!!state?.error?.password && (
                            <div className="text-red-500 text-sm mt-1">
                                {state.error.password.map((error)=>(
                                    <div key={error}>• {error}</div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <SubmitButton className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition duration-200">
                        Create Account
                    </SubmitButton>
                </form>
                
                <div className="text-center mt-6">
                    <p className="text-gray-600">Already have an account? 
                        <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium ml-1">Sign In</Link>
                    </p>
                </div>
            </div>
      
    )
}
export default SignUpForm