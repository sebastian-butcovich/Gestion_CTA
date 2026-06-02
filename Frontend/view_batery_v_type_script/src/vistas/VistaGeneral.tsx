import { SideBarMenu } from "@/component/SideBarMenu";
import type { SideBarMenuCard, SideBarMenuItem } from "@/types/types";
import { FaBusSimple } from "react-icons/fa6";
import { SiNginxproxymanager } from "react-icons/si";
import pictureProfile from "./../../../../../../../../../../Imágenes/Camera/IMG_20260508_214213.jpg";
import { Outlet } from "react-router-dom";
import "./estilosGenerales.scss"
export function BasicView() {
  const items: SideBarMenuItem[] = [
    {
      id: "1",
      label: "Micros",
      icon: FaBusSimple,
      url: "/vehiculos",
    },
    {
      id: "2",
      label: "Administración",
      icon: SiNginxproxymanager,
      url: "/",
    },
  ];
  const card: SideBarMenuCard = {
    id: "1",
    displayName: "Sebastián Butcovich",
    title: "Programador",
    photoUrl: pictureProfile,
    url: "/",
  };

  return (
    <div className="contenedor">
      <SideBarMenu items={items} card={card}></SideBarMenu>
      <Outlet/>
    </div>
  );
}
