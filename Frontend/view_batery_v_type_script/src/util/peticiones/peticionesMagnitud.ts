import axios from "axios";
import { URL } from "@/configuraciones";
export interface Filtro {
    minutos:number
    hInicio:number;
    hFin:number;
    diaInicio:number,
    diaFin:number,
    mesInicio:number,
    mesFin:number,
    anioInicio:number,
    anioFin:number
}
export async function obtenerMagnitudes(id: number, f:Filtro) {
    try {
        console.log("Llega filtro a la función obtenerMagnitudes",f)
        const url = `${URL}magnitud`
        const response = await axios.get(url, { params: { "idBateria": id, "filtro":f } });
        console.log(response)
        return response.data.magnitudFisicaResponses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}