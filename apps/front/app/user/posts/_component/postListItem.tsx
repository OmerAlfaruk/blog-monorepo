import { Post } from "@/lib/types/moduleTypes"
import { Check, XIcon } from "lucide-react"
import Image from "next/image"
import PostActions from "./postActions"

const PostListItem=({post}:{post:Post})=>{
    return(
        <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 overflow-hidden border hover:scale-[101%] transition text-center bg-white items-center ju\ ">
            <div className="relative h-32 w-40 col-span-2">
                <Image src={post.thumbnail??"/no-image.png"} alt="image" className="" fill />
            </div >
            <div >
                <p className="font-bold line-clamp-1">{post.title}</p>
                <p className="line-clamp-3">{post.content}</p>
            </div>
            <div>{new Date(post.createdAt ?? '').toLocaleDateString()}</div>
            <div className="text-center justify-items-center">{post.published ? (<Check size={20} color="green"/>) : (<XIcon size={20} color="red"/>)}</div>
            <div>{post._count?.likes}</div>
            <div>{post._count?.comments}</div>

            <PostActions postId={post.id} />
        </div>
    )
}

export default PostListItem