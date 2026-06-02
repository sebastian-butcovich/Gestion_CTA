import { TarjetaVehiculo } from "../TarjetaVehiculo"
import "../vehiculos.scss"
import imgTelemetria from "../../../../assets/telemetria.webp"
import imgPartes from "../../../../assets/partes.png"
import imgConfiguracion from "../../../../assets/configuracion.webp"
export function VistaInternaVehiculo(){
    return (<div className="contenedor">
        <h1>Vista Interna Vehículo</h1>
        <div className="vehiculos">
            <TarjetaVehiculo nombre="Telemetria" foto={imgTelemetria} destino="/telemetria" ubicacion=""/>
            <TarjetaVehiculo nombre="Partes" foto={imgPartes} ubicacion="" destino="/partes"/>
            <TarjetaVehiculo nombre="Configuracion" foto={imgConfiguracion} ubicacion="" destino="/configuracion"/>
        </div>
    </div>)
}