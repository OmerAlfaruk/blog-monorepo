import { Post } from "@/lib/types/moduleTypes";
import PostCard from "./postCard";
import Pagination from "./pagination";
type Props={
    posts:Post[];
    currentPage:number;
    totalPage:number;
    pagesNeighbors?:number;
}
const Posts=(props: Props) => {


  return (
    <section className="container mt-8 max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-600 leading-tight">Latest Posts</h2>
        <div className="h-1 mx-auto bg-linear-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {props.posts.map(post=>(
                <PostCard key={post.id} {...post}/>
            ))}
        </div>
        <Pagination currentPage={props.currentPage} totalPage={props.totalPage} pagesNeighbors={props.pagesNeighbors || 2}/>
    </section>
  );
}

export default Posts