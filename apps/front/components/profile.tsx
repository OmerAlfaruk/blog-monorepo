import { SessionUser } from "@/lib/session";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "./ui/popover"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { PencilSquareIcon, UserIcon } from "@heroicons/react/20/solid";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";



type Props={
    user:SessionUser;
}

const Profile= ({user}:Props) => {
  return (

    <Popover>
        <PopoverTrigger>
            <Avatar>
                <AvatarImage src={user.avatar} className="rounded-full w-14 border border-white" />  

                <AvatarFallback>
                    <UserIcon className="w-8 text-slate-500"/>
                  
                </AvatarFallback>
            </Avatar>
        </PopoverTrigger>
        <PopoverContent>
            <div className="flex gap-3 justify-center items-center ">
                <UserIcon className="w-6"/>
                <p className="text-sm">{user.name}</p>
              
            </div>
            <div className="*:grid *:grid-cols-5 *:gap-2 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500  [&>*:hover]:p-4  [&>*:hover]:rounded-md  *:rounded-md [&>*>*:nth-child(1)]:justify-self-end *:transition  *:cursor-potion" >
                <a href="/api/auth/signout">
                
                    <ArrowRightStartOnRectangleIcon className="w-4"/>
                    <span className="" >Sign out</span>
                
               
                </a>
                <Link href="/user/create-post">
               
                <PencilSquareIcon className="w-4"/>
                    <span className="">Create Post</span>
                
                </Link>

                <Link href="/user/posts">
                
                <PencilSquareIcon className="w-4"/>
                    <span className="">Posts</span>
              
                </Link>

                

            </div>

        </PopoverContent>
    </Popover>
   
  )
}
export default Profile