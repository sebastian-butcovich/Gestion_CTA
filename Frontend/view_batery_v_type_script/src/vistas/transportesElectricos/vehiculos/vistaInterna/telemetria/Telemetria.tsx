import { GlowingLineChart } from "@/components/ui/glowing-line";
import "./telemetria.scss"
export function Telemetria(){
    return(<div className="contenedor" >
        <h1 className="titulo">Telemetria del automóvil</h1>
        <GlowingLineChart/>
    </div>)
}