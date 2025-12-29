"use client"
import { Button } from "@/components/ui/button"
import { getPostLikeData, likePost, unLikePost } from "@/lib/actions/like"
import { SessionUser } from "@/lib/session"
import { HeartIcon } from "@heroicons/react/20/solid"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Heart, HeartCrack, ThumbsUpIcon } from "lucide-react"
type Props={
    postId:number,
    user?:SessionUser



}



const Like=({postId,user}:Props)=>{

    const {data,refetch:refetchLike}=useQuery({
        queryKey:[`like-${postId}`], 
        queryFn: async () => await getPostLikeData(postId)
    })

    const likeMutation=useMutation({
        mutationFn: async () => await likePost(postId)
        ,onSuccess:()=>refetchLike()
    })

    const unLikeMutation=useMutation({
        mutationFn: async () => await unLikePost(postId)
        ,onSuccess:()=>refetchLike()
    })


    return (
        <div className="flex gap-4 items-center px-4">
            {data?.userLikedPost? <Button onClick={() => unLikeMutation.mutate()} variant={"ghost"}>
                <HeartIcon className="w-10 h-10 text-red-500" />
            </Button>:<Button onClick={() => likeMutation.mutate()} variant={"ghost"}>
                <Heart className="w-10 h-10 text-slate-500" />
            </Button>}

             <p className="text-sm text-slate-500">{data?.likeCount} likes</p>
        </div>
    )
}
export default Like