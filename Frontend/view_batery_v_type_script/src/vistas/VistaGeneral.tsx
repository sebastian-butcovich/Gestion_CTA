import { SideBarMenu } from "@/component/SideBarMenu";
import { GlowingLineChart } from "@/components/ui/glowing-line"
import type { SideBarMenuCard, SideBarMenuItem } from "@/types/types";
import { FaBusSimple } from "react-icons/fa6";
import { SiNginxproxymanager } from "react-icons/si";
import pictureProfile from "./../../../../../../../../../../Imágenes/Capturas de pantalla/Captura desde 2026-01-27 12-55-45.png"
export function BasicView() {
    const items:SideBarMenuItem[]=[
        {
            id:"1",
            label:'Micros',
            icon:FaBusSimple,
            url:"/"
        },
        {
            id:"2",
            label:"Administración",
            icon:SiNginxproxymanager,
            url:"/"
        }
    ]
    const card:SideBarMenuCard=
        {
            id:"1",
            displayName:"Sebastián Butcovich",
            title:"Programador",
            photoUrl:pictureProfile,
            url:"/"
        }
    
    return (
        <div>
            <SideBarMenu items={items} card={card}></SideBarMenu>
            <GlowingLineChart></GlowingLineChart>
            </div>);

}