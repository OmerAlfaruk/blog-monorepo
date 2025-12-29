
import { TooltipTrigger } from "@/components/ui/tooltip"
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid"
import { Tooltip, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip"
import Link from "next/link"

type Props={

    postId:number
}


const PostActions=({postId}:Props)=>{

    return(
        <div className="flex justify-center items-center">
        <TooltipProvider>
        <Tooltip >
        <TooltipTrigger asChild >

        <Link className="border h-6,w-6 p-2 m-2 rounded-md border-yellow-500 text-yellow-500 hover:border-yellow-700 hover:text-yellow-700 transition-colors inline-flex items-center justify-center" href={`/user/posts/${postId}/edit`}>
            <PencilIcon className="w-4 h-4"/>
        </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-yellow-500 text-white p-1 m-2 rounded-md">
            <p>Edit Post</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
         <Link className="border m-2 p-2 rounded-md border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 transition-colors inline-flex items-center justify-center" href={`/user/posts/${postId}/edit`}>
            <TrashIcon className="w-4 h-4"/>
        </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-red-500 text-white p-1 m-2 rounded-md">
            <p>Delete Post</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        </div>

        
    )
}
export default PostActions
