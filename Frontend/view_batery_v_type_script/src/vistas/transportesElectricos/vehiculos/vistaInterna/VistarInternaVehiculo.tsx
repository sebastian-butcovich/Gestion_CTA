import { TarjetaVehiculo } from "../TarjetaVehiculo"
import "../vehiculos.scss"
import imgTelemetria from "../../../../assets/telemetria.webp"
import imgPartes from "../../../../assets/partes.png"
import imgConfiguracion from "../../../../assets/configuracion.webp"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
export function VistaInternaVehiculo(){
    const [id,setId] = useState(-1);
    const location = useLocation();
    function obtenerVehiculoSeleccionado(){
        console.log("Que tiene location",location.state)
        setId(location.state.id);
    }
    useEffect(()=>{
        obtenerVehiculoSeleccionado();
    },[])
    return (<div className="contenedor">
        <h1>Vista Interna Vehículo</h1>
        <div className="vehiculos">
            <TarjetaVehiculo nombre="Telemetria" foto={imgTelemetria} destino="/telemetria" ubicacion="" id={id}/>
            <TarjetaVehiculo nombre="Partes" foto={imgPartes} ubicacion="" destino="/partes" id={id}/>
            <TarjetaVehiculo nombre="Configuracion" foto={imgConfiguracion} ubicacion="" destino="/configuracion" id={id}/>
        </div>
    </div>)
}