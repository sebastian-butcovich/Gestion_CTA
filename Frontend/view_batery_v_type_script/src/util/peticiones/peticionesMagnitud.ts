import axios from "axios";
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
    export async function obtenerMagnitudes() {
    try {
        const url = "http://localhost:8080/magnitud"
        const response = await axios.get(url,{params:{"idBateria":4}});
        return response.data.magnitudFisicaResponses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}