import { TarjetaVehiculo } from "../TarjetaVehiculo"
import "../vehiculos.scss"
import imgTelemetria from "../../../../assets/telemetria.webp"
import imgPartes from "../../../../assets/partes.png"
import imgConfiguracion from "../../../../assets/configuracion.webp"
import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { VehiculoSeleccionadoContext } from "@/util/contextos/VehiculoSeleccionado"
import { obtenerVehiculo } from "@/util/peticiones/peticionesVehiculos"
export  function VistaInternaVehiculo(){
    const contextoVehiculo = useContext(VehiculoSeleccionadoContext)
    const location = useLocation();
    async function obtenerVehiculoSeleccionado(){
        //El vehículo seleccionado pasa el ID y se recupera en esta vista.
        const id =(location.state.id);
        //Se obtienen todos los datos de ese vehículo. 
        const response = await obtenerVehiculo(id)
        if(response != undefined && response.status == 200){
            //Se guarda en el contexto de vehículo seleccionado. 
            contextoVehiculo?.actualizarDatos(response.data)
        }
    }
    useEffect(()=>{
        obtenerVehiculoSeleccionado();
    },[])
    return (<div className="contenedor">
        <h1>Vista Interna Vehículo</h1>
        <div className="vehiculos">
            <TarjetaVehiculo nombre="Telemetria" foto={imgTelemetria} destino="/telemetria" ubicacion=""/>
            <TarjetaVehiculo nombre="Partes" foto={imgPartes} ubicacion="" destino="/partes"/>
            <TarjetaVehiculo nombre="Configuracion" foto={imgConfiguracion} ubicacion="" destino="/configuracion"/>
        </div>
    </div>)
}