import { getUserPosts } from "@/lib/actions/postActions"
import { DEFAULT_PAGE_SIZE } from "@/lib/constants"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import NoPost from "./_component/NoPost"
import PostsList from "./_component/posts"
type Props = {

    searchParams: Promise<{ [key: string]: string | string[] | undefined }>


}
export default async function  UserPostsPage({searchParams}: Props) {
    const session = await getSession();
    
    if (!session || !session.user) {
        redirect('/auth/signin');
    }

    const {page}=await searchParams

    const {totalposts,posts}=await getUserPosts({
        page:page?+page:1,
        pageSize:DEFAULT_PAGE_SIZE
    })
    return (
        <div>{(!posts||!posts.length)?<NoPost/>:<PostsList posts={posts} currentPage={page?+page:1} totalPage={Math.ceil(totalposts/DEFAULT_PAGE_SIZE)}/>}</div>
    )
}
