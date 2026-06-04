import { useEffect, useState } from "react"
import "./vehiculos.scss"
import { TarjetaVehiculo } from "./TarjetaVehiculo"
import { obtenerVehiculos } from "@/util/peticiones/peticionesVehiculos"
import img from "../../../assets/file.jpeg"
interface Vehiculo{
    id:number,
    nombre:string,
    foto:string,
    destino:string
}
export function VehiculosElectricos(){
    //Guarda los vehículos 
    const[vehiculos,setVehiculos] = useState<Vehiculo>([]);
    async function obtenerVehiculosElectricos(){
        const response = await obtenerVehiculos();
        if(response.status =200){
            console.log("Vehiculos",response.data)
            setVehiculos(response.data)
        }
    }
    useEffect(()=>{
        obtenerVehiculosElectricos();
    },[])
    return(<div className="contenedor">
        <h1 className="titulo">Vehículos eléctricos</h1>
        <div className="vehiculos">{ vehiculos.length !=0 ?vehiculos.map((vehiculo)=>(    
            <TarjetaVehiculo  key={vehiculo.id} nombre={vehiculo.nombre} foto={img} destino="/vistaInterna" ubicacion="" id={vehiculo.id} ></TarjetaVehiculo>
        )):null}</div>
    </div>)
}