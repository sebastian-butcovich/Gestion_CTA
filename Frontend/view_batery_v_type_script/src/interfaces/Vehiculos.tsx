export interface Vehiculo{
    id:number|null
    nombre:string
    bateria:Bateria
    ubicacion:Ubicacion
}
export interface Ubicacion{
    id:number|null
    pais:string,
    provincia:string,
    ciudad:string,
    calle:string,
    numero:number
}
export interface Bateria{
    id:number|null
    nombre:string
    numero_celdas:number
}