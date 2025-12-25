import { PropsWithChildren } from "react";
import DesktopNavbar from "./desktopNavbar";
import MobileNavbar from "./mobileNavbar";
type Props = PropsWithChildren

const  NavabarContainer=(props: Props) =>{
    return (
        <div className="relative z-50 ">
        <DesktopNavbar>
            {props.children}
        </DesktopNavbar>

        <MobileNavbar>
            {props.children}
        </MobileNavbar>
          
        </div>
    );
}
export default NavabarContainer