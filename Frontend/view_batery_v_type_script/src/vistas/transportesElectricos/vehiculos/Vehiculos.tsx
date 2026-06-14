import { useEffect, useState } from "react"
import "./vehiculos.scss"
import { TarjetaVehiculo } from "./TarjetaVehiculo"
import { obtenerVehiculos } from "@/util/peticiones/peticionesVehiculos"
import img from "../../../assets/file.jpeg"
import Swal from "sweetalert2"
import { eliminarVehiculo } from "@/util/peticiones/peticionesVehiculos"
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
    async function accionEliminarVehiculo(idVehiculo:number){
        //Mostrar interfaz de confirmación
        Swal.fire({
            title:"Desea eliminar el vehículo?",
            text:"Si elimina el vehículo no podra recuperar al información",
            icon:"question",
            confirmButtonText:"Sí",
            confirmButtonColor:"blue",
            showDenyButton:"true",
            denyButtonColor:"red",
            denyButtonText:"No"
        }).then(async (response)=>{
            //Si el usuario presiona que sí, sigue el camino para eliminar un vehiculo.
            if(response.isConfirmed){
                const result = await eliminarVehiculo(idVehiculo);
                if(result.status == 200){
                    
                }
            }
        });
        //Si el usuario presiona que no, no se realiza ninguna acción. 
    }
    useEffect(()=>{
        obtenerVehiculosElectricos();
    },[])
    return(<div className="contenedor">
        <h1 className="titulo">Vehículos eléctricos</h1>
        <div className="vehiculos">{ vehiculos.length !=0 ?vehiculos.map((vehiculo)=>(   
            <div className="vehiculos_internos">
                <TarjetaVehiculo  key={vehiculo.id} nombre={vehiculo.nombre} foto={img} destino="/vistaInterna" ubicacion="" id={vehiculo.id} ></TarjetaVehiculo>
                <button className="vehiculos_internos_boton_eliminar" onClick={()=>accionEliminarVehiculo(vehiculo.id)}>ELIMINAR</button>
            </div> 
        )):null}
        </div>
    </div>)
}