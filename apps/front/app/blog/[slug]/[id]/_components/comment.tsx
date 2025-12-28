"use client";

import { getPostCommets } from "@/lib/actions/commentAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CommentCard from "./commentCard";
import CommentPagination from "./commentPagination";
import { CommentSkeleton } from "./skeleton";
import { MessageCircle, PencilIcon } from "lucide-react";
import CommentForm from "./commentForm";
import AddComment from "./addComment";
import { SessionUser as SessionUserType } from "@/lib/session";

type SessionUser = {
    id: string;
    name: string;
    email: string;
    image?: string;
};

type Props={
    postId:number,
    user?:SessionUserType
}
const CommentComponent = ({postId,user}:Props) => {

    const [page, setPage] = useState(1);
    const [showCommentForm, setShowCommentForm] = useState(false);
    console.log('Component rendered with postId:', postId);
    
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['GET_COMMENTS', postId, page],
        queryFn: async () => {
            console.log('Query function called!');
            return await getPostCommets({
                postId,
                skip: (page - 1) * DEFAULT_PAGE_SIZE,
                take: DEFAULT_PAGE_SIZE
            });
        },
        enabled: !!postId // Only run if postId exists
    })
   const  totalPages=Math.ceil((data?.totalcomments ?? 0) / DEFAULT_PAGE_SIZE)
    
    
    
    return (
        <div className="p-2 rounded rouded-md shadow-md">
          <div className="flex flex-row gap-10">
            <MessageCircle className="w-8 h-8 text-slate-500" />

            <div className="flex flex-col">
                <p className="font-bold">Comments</p>
                <p className="text-sm text-slate-500">{data?.totalcomments} comments</p>
            </div>

            <div className="flex flex-col">
                <p className="font-bold">Last Comment</p>
                <p className="text-sm text-slate-500">{data?.comments?.[0]?.author?.name ?? 'No comments yet'}</p>
            </div>


            {user && (
                <div className="flex flex-row gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded" >
                    <PencilIcon className="w-6 h-6 text-slate-500" />
                    <AddComment postId={postId} user={{
                        id: user.id || '',
                        name: user.name || '',
                        email: '',
                        image: user.avatar
                    }} refetch={refetch}/>
                </div>
            )}



        




          </div>

            <div className="flex flex-col gap-2">
                {isLoading && Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
                    <CommentSkeleton key={index}/>
                ))}
                {data?.comments?.map(comment=>(
                    <CommentCard key={comment.id} comment={comment}/>
                ))}
            </div>
            <CommentPagination className="p-2"
                currentPage={page}
                totalPages={totalPages}
                setCurrentPage={setPage}
            />
            
        </div>
    )
}

export default CommentComponent