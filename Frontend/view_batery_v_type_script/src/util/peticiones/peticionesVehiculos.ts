import type { Vehiculo } from "@/interfaces/Vehiculos";
import axios from "axios";
import { URL } from "@/configuraciones";
export async function obtenerVehiculos(){
    try{

        const url = `${URL}vehiculos`;
        const response = await axios.get(url)
        console.log(response)
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}
export async function obtenerVehiculo(id:number){
    try{
        console.log("El id que envio",id);
        const url = `${URL}vehiculos/${id}`;
        const response = await axios.get<Vehiculo>(url)
        return response;
    }catch(error){
        console.log(error);
    }
}
export async function modificarDatosVehiculo(vehiculo:Vehiculo){
    try{
        const url = `${URL}vehiculos`
        console.log("Que tiene vehiculos",vehiculo)
        const response = await axios.post(url,vehiculo)
        return response;
    }catch(error:any){
        console.log("Este error ocurre en la petición modificar los datos del vehiclo ", error);
        return error.status
    }
}
export async function eliminarVehiculo(id:number){
    const url = `${URL}vehiculos/${id}`
    try{
        const response = await axios.delete(url)
        return response;
    }catch(error:any){
        console.log(error)
        return error.response
    }
}