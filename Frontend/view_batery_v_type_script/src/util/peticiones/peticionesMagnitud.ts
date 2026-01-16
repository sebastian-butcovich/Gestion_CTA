import axios from "axios";
interface magnitud {
    valor: number,
    tipo: string,
    fecha: Date,
    idBateria: number
}
    export async function obtenerMagnitudes() {
    try {
        const url = "http://localhost:8080/magnitud"
        const response = await axios.get(url,{params:{"idBateria":2}});
        return response.data.magnitudFisicaResponses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}