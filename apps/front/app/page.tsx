import Image from "next/image";
import Hero from "@/components/hero";
import Posts from "@/components/posts";
import { fetchPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function Home({searchParams}: Props) {
  const {page} =await searchParams; 
  const {posts,totalposts}=await fetchPosts( {page:page?+page:undefined} );
  return (
    <div>
      <main>
       <Hero/>
       <Posts posts={posts} currentPage={page?+page:1} totalPage={Math.ceil(totalposts/DEFAULT_PAGE_SIZE)} />
      </main>
    </div>
  );
}
