import Link from "next/link";


 type Props = {};

 const Navbar=(props: Props) => {
   return (
     <div className="flex flex-col md:flex-row " >
      <h1 className="text-xl font-bold items-center " >My Modern Blog</h1>
      <div className="flex flex-col md:flex-row gap-4  ml-2 md:ml-auto   [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500  [&>a:hover]:px-4 " >
      <Link href="/" passHref>
      Home
      </Link>
      <Link href='#about'>
      About
      </Link>
      <Link href='#contact'>
      Contact
      </Link>
      </div>
     </div>
   );
 }
 export default Navbar