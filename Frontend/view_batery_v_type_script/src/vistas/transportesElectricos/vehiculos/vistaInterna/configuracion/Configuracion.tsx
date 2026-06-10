import FormularioVehiculo from "@/component/formularioConfiguarVehiculo/FormularioVehiculo"
import "./configuracion.scss"

function Configuracion() {

    return (<div className="contendorConfiguracion">
        <h1>Configuración del vehículo</h1>
        <FormularioVehiculo/>
    </div>)
}
export default Configuracion