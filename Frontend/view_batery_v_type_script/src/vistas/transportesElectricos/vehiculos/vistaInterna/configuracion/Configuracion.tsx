import FormularioVehiculo from "@/component/formularioConfiguarVehiculo/FormularioVehiculo"
import "./configuracion.scss"
import { useEffect } from "react"
function Configuracion(id:number) {

    return (<div className="contendorConfiguracion">
        <h1>Configuración del vehículo</h1>
        <FormularioVehiculo id={id}/>
    </div>)
}
export default Configuracion