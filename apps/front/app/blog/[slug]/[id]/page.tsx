import { fetchPostById } from "@/lib/actions/postActions";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

type Props={
    params: Promise<{
        id: string;
       
    }>;
}


const postPage=async ({params}:Props)=>{
    const {id} = await params;
    const post=await fetchPostById(+id);

    return (
       <main className="container mx-auto px-4 py-8 "> 


      <div>
         <h1 className="text-4xl font-bold mb-4 text-slate-700 mt-16">

        {post.title}


       </h1>
       <p className="text-slate-500
        text-sm mb-4">

            By {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div className="relative w-full h-96 mb-6">
            <Image src={post.thumbnail??"/no-image.png"} alt="post-thumbnail" fill className="object-cover rounded-lg"/>
        </div>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content)}}>

            {/* Post Comment */}

            


        </div>
      </div>



       </main>
    )






}

export default postPage