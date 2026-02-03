import type { IconType } from "react-icons";

// Se define los parámetros para los tipos de datos 
export interface SideBarMenuItem{
    id:string;
    label:string;
    icon:IconType;
    url:string;
}
export interface SideBarMenuCard{
    id:string;
    displayName:string;
    photoUrl:string;
    title:string
    url:string
}