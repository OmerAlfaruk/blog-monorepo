import { PropsWithChildren } from "react";




const UserPostLayout=({children}:PropsWithChildren)=>{
    return(
        <div className="mt-20 items-center flex flex-col justify-center">
            {children}
        </div>
    )
}
export default UserPostLayout;