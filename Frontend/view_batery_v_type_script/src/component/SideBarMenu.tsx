import type { SideBarMenuItem, SideBarMenuCard } from "@/types/types";
import { useState } from "react";
import { classNames } from "@/util/classes";
import {VscMenu} from "react-icons/vsc"
import {SideBarMenuCardView} from "./SideBarMenuCardView"
import { SideBarMenuItemView } from "./SideBarMenuItemView";
import "./SideBarMenu.scss";
interface SideBarMenuProps{
   items:SideBarMenuItem[];
   card:SideBarMenuCard
   
}
export function SideBarMenu({items,card}:SideBarMenuProps){
   const[isOpen,setIsOpen] = useState<boolean>(false);
   return(<div className={classNames('SideBarMenu',isOpen ? 'expanded':'collapsed')}>
      <div className="menuBottom">
         <button className="hamburgerIcon" onClick={()=>{setIsOpen(!isOpen)}}>
            <VscMenu/>
         </button>
      </div>
      <SideBarMenuCardView card={card} isOpen={isOpen}/>
      {
         items.map((item) =>(
            <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen}/>
         ))
      }
   </div>) 
}