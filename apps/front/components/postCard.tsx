import { Post } from "@/lib/types/moduleTypes"
import Link from "next/link";
import Image from "next/image";

type Props=Partial<Post>

const PostCard=({...props}:Props)=>{
    return (
        <div className="flex flex-col bg-white border border-grey-200 rounded-lg shadow-md overflow-hidden">
            <div className="relative h-60"> 
<Image src={props.thumbnail??"/no-image.png"} alt={props.title??""} fill className="object-cover" />
            </div>
            
            <div className="p-6 grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-500 mt-4 wrap-break-word text-center">{props.title}</h3>
                 <p className=" mt-4 text-gray-500 text-sm max-h-50 overflow-y-clip">{new Date(props.createdAt?? '').toLocaleDateString()}</p>
                <p className="text-gray-600 max-h-50 overflow-y-clip">{props.content?.slice(0,100)}...</p>

                <Link className="text-indigo-500 hover:underline mt-auto text-right" href={`/blog/${props.slug}/${props.id}`}>Read more</Link>
                
           </div>
        </div>
    );
}
export default PostCard