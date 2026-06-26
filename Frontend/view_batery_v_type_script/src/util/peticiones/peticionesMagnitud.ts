import axios from "axios";
import { URL } from "@/configuraciones";
export interface Filtro {
    minutos: number
    hInicio: number;
    hFin: number;
    diaInicio: number,
    diaFin: number,
    mesInicio: number,
    mesFin: number,
    anioInicio: number,
    anioFin: number,
    tipo:string
}
export async function obtenerMagnitudes(id: number) {
    try {
        const url = `${URL}magnitud`
        const response = await axios.get(url, { params: { "idBateria": id } });
        console.log(response)
        return response.data.magnitudFisicaResponses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function obtenerMagnitudesFiltradas(id: number, f: Filtro) {
    try {
        console.log("Llega filtro a la función obtenerMagnitudesFiltradas", f)
        const url = `${URL}magnitud/${id}`
        const response = await axios.post(url, f);
        console.log("Respuesta de datos filtrados ",response)
        return response.data.magnitudFisicaResponses;
    }catch (error) {
        console.log(error);
        throw error;
    }
}