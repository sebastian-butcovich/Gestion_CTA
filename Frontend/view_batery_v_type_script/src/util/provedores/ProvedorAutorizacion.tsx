import { useContext, createContext, useState }  from "react";
import type { ReactNode } from "react";
interface AutorizacionContextType{
    estaAutorizado:boolean;
    obtenerAutorizacion:()=>boolean;
    establecerEstaAutorizado:(valor:boolean)=>void;
}
const contextoAutorizacion = createContext<AutorizacionContextType | undefined>(undefined)
interface ProvedorAutorizacionProps{
    hijo:ReactNode;
}
export function ProvedorAutorizacion({hijo}:ProvedorAutorizacionProps){
    const [estaAutorizado,establecerEstaAutorizado] = useState(false)
    function obtenerAutorizacion(){
        return estaAutorizado;
    }
    return <contextoAutorizacion.Provider value={{estaAutorizado,obtenerAutorizacion,establecerEstaAutorizado}}>{hijo}</contextoAutorizacion.Provider>
}
export function usarAutorizacion(){
    const contexto = useContext(contextoAutorizacion)
    if(!contexto){
        throw new Error("Error de autorización")
    }
    return contexto
}
