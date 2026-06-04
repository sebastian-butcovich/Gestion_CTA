import { useNavigate } from "react-router-dom"
import "./tarjetaVehiculos.scss"
interface DatosVehiculo{
    nombre:string,
    ubicacion:string,
    foto:string,
    destino:string
    id:number
}
export function TarjetaVehiculo({
    nombre,
    ubicacion,
    foto,
    destino,
    id
}:DatosVehiculo){
    console.log(id)
    const navegacion = useNavigate();
    return (<div className="auto-carta" onClick={()=>{navegacion(destino,{
        state:{id}
    })}}>
        <div className="auto-carta-imagen">
            <img src={foto} alt={nombre} className="auto-imagen"/>
            <span className="badge">{nombre}</span>
        </div>
        <div className="carta-contenido">
            <h2 className="carta-titulo">{nombre}</h2>
            <div className="carta-especificaciones">
                <div className="especificacion">
                    <span className="label">Ubicación</span>
                    <span className="value">{ubicacion}</span>
                </div>
            </div>
        </div>
        </div>)
}