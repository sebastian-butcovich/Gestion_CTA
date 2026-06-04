import FormularioVehiculo from "@/component/formularioConfiguarVehiculo/FormularioVehiculo"
import "./configuracion.scss"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

function Configuracion() {
    const [id,setId] = useState(-1);
    const location = useLocation();

    useEffect(()=>{console.log("llega el id a configuración",location.state.id)
        setId(location.state.id)
    })
    return (<div className="contendorConfiguracion">
        <h1>Configuración del vehículo</h1>
        <FormularioVehiculo/>
    </div>)
}
export default Configuracion