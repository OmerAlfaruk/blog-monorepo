 'use client'
 import { Bars3Icon } from "@heroicons/react/16/solid";
import { Sidebar } from "lucide-react";
import { PropsWithChildren, use, useState } from "react";
import SideBar from "./sideBar";

type Props={}



const MobileNavbar=(props:PropsWithChildren<Props>) => {
  return (
  <div className="md:hidden">
     <SideBar triggerIcon={<Bars3Icon className="w-4" />} triggerClassName="absolute top-2 left-2">
    {props.children}
   </SideBar>
  </div>
  );
}

export default MobileNavbar