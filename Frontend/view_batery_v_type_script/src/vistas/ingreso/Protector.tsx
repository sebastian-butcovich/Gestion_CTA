import { Outlet,Navigate } from "react-router-dom";
import { usarAutorizacion } from "@/util/provedores/ProvedorAutorizacion";
export function Protector(){
    const {estaAutorizado} = usarAutorizacion()
    return estaAutorizado ? <Outlet/>:<Navigate to="/"/>
}