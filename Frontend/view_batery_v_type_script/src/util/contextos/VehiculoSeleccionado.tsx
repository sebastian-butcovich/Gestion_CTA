 import React, {createContext, useState} from 'react';
 import type { ReactNode } from 'react';
 import type{ Vehiculo,Bateria,Ubicacion } from '@/interfaces/Vehiculos';

interface VehiculoSeleccionadoProviderProps{
    children:ReactNode
}
interface VehiculoContextType{ 
    vehiculoSeleccionado: Vehiculo|undefined;
    actualizarDatos:(datos:Vehiculo)=>void;
}
export const VehiculoSeleccionadoContext = createContext<VehiculoContextType | undefined>(undefined);
function VehiculoSeleccionado({children}:VehiculoSeleccionadoProviderProps){
    const[vehiculoSeleccionado,setVehiculoSeleccionado] = useState<Vehiculo|undefined>(undefined);
    function actualizarDatos(datos:Vehiculo){
        setVehiculoSeleccionado(datos);
    };
    return(
        <VehiculoSeleccionadoContext.Provider value={{vehiculoSeleccionado,actualizarDatos}}>
            {children}
        </VehiculoSeleccionadoContext.Provider>
    )
}
export default VehiculoSeleccionado;
export const useContextVehiculo = (): VehiculoContextType => {
    const context = React.useContext(VehiculoSeleccionadoContext);
    if(!context){
        throw new Error("VehiculoSeleccionadoContext debe ser utilizado dentro del VehiculoSeleccionadoProvider");
    }
    return context;
}