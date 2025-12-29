import { Post } from "@/lib/types/moduleTypes"
import PostListItem from "./postListItem"
import Pagination from "@/components/pagination"


type Props = {
    posts: Post[],
    currentPage: number,
    totalPage: number,
    
}


const  PostsList=({posts,currentPage,totalPage}: Props)=> {
    return (
        <div className="">
            <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center  trelative z-50">
                <div className="col-span-3 "></div>
                <div className="items-center">Date</div>
                <div className="items-center">Published</div>
                <div className="items-center">Likes</div>
                <div className="items-center">Comments</div>
                <div className="items-center"></div>
            </div>
            {posts.map((post: Post) => (
                <PostListItem key={post.id} post={post}/>
            ))}
            <Pagination currentPage={currentPage} totalPage={totalPage} pagesNeighbors={2} basePath="/user/posts"/>
        </div>

        


    )
}

export default PostsList