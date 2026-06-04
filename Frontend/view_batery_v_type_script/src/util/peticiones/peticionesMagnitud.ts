import axios from "axios";
import { URL } from "@/configuraciones";
interface magnitud {
    id:number|null,
    valor: number,
    tipo: {
        id:number|null,
        tipo:string
    },
    fecha: Date,
    idBateria: number
}
interface Promp{
    id:number
}
    export async function obtenerMagnitudes(promp:Promp) {
    try {
        console.log(promp.id)
        const url = `${URL}magnitud`
        const response = await axios.get(url,{params:{"idBateria":promp.id}});
        console.log(response)
        return response.data.magnitudFisicaResponses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}