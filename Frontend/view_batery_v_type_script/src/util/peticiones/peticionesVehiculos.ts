import axios from "axios";
export async function obtenerVehiculos(){
    try{

        const url = "http://localhost:8080/vehiculos";
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
        const url = "http://localhost:8080/vehiculo";
        const response = await axios.get(url,{
            params:{"id":id}
        });
        
    }catch(error){
        console.log(error);
    }
}