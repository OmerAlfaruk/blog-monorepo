  
 'use client'
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
 import { PropsWithChildren, use, useState } from "react";

 type Props = PropsWithChildren<{}>;
 import { useEffect } from "react";


 
 const DesktopNavbar=(props:Props) => {


    const [scrollPosition,setScrollPosition]=useState(0);
    const handleScroll = () => {
    setScrollPosition(window.scrollY)
    
 }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    });
const pathname=usePathname();
    const isScrollDown= scrollPosition>10; 
    const  isHome=pathname=="/"

      
    return (
       <nav className="">
        <div className={cn("hidden fixed py-4 px-4 transition-colors w-full  z-50  md:block",{
         "bg-white text-gray-700 shadow-md":isScrollDown||isHome,
         "bg-sky-500 text-white":!isScrollDown&&!isHome
       })}>
            {props.children}
        </div>
        <hr className="border-b border-gray-100 opacity-25"/>
       </nav>

    );
 }
 export default DesktopNavbar