

import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode, useRef, useState, RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";



type Props=PropsWithChildren<{
    triggerIcon:ReactNode;
    triggerClassName?:string
}>


const SideBar = (props: Props) => {
    const [showSideBar, setShowSideBar] = useState(false);
      const ref = useRef<HTMLDivElement>(null);

      const closeDropdown = () => {
        setShowSideBar(false);
      };

  useOnClickOutside(ref as RefObject<HTMLElement>, closeDropdown);

  return (
   <>
   <button className={props.triggerClassName} onClick={() => setShowSideBar((prev) => !prev)}>{props.triggerIcon}</button>
 <div 
 ref={ref}
 className={cn("w-60 absolute top-0 z-10 transition-all duration-300 bg-white rounded-r-md min-h-screen",{"-left-full":!showSideBar,"left-0":showSideBar})}>
    {props.children}
 </div>
   
   </>
  );
}
export default SideBar
