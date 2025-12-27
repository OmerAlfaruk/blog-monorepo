import Link from "next/link"

const SignInPannel=()=>{
    return(
        <>

        <Link href={"/auth/signin"}>SignIn</Link>
        <Link href={"/auth/signup"}>SignUp</Link>
        </>
    )
}

export default SignInPannel