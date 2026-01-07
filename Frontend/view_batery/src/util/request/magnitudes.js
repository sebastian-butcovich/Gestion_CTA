import axios from "axios";

const apiUrl = "http://localhost:8080/";
export async function obtenerDatosMagnitudes(idBateria){
    try{
        const response = await axios({
        url:`${apiUrl}magnitud`,
        method:"GET",
        params:{"idBateria":idBateria}
    })
    return response; 
    }catch(error){console.log(error)}
}