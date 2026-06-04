import { GlowingLineChart } from "@/components/ui/glowing-line";
import "./telemetria.scss"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export function Telemetria(){
    const location = useLocation()
    const id = location.state.id
    return(<div className="contenedor" >
        <h1 className="titulo">Telemetria del automóvil</h1>
        <GlowingLineChart id={id}/>
    </div>)
}