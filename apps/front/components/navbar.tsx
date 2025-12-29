import { getSession } from "@/lib/session";
import Link from "next/link";
import SignInPannel from "./signInPannel";
import Profile from "./profile";


 type Props = {};

 const Navbar= async (props: Props) => {
  const session = await getSession()
   return (
     <div className="flex flex-col md:flex-row " >
      <h1 className="text-xl font-bold items-center " >My Modern Blog</h1>
      <div className="flex flex-col md:flex-row gap-4  items-center ml-2 md:ml-auto   [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500  [&>a:hover]:px-4 " >

      <Link href="/" passHref>
      Home
      </Link>
      
      <Link href='#about'>
      About
      </Link>
      <Link href='#contact'>
      Contact
      </Link>

      {session && session.user?<Profile user={session.user}/>:<SignInPannel/>}
      </div>
     </div>
   );
 }
 export default Navbar