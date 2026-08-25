//Lo que hace esta función es tomar una fecha que viene con el formato 2026-01-06T19:53:31.832Z
// Y pasarlo a un formato más legible mes-dia
// Además reduce el tamaño de muestras totales a algo mas finito ya que es imposible mostrar miles de entradas en un gráfico
export function formatearDatos(magnitudes:any,tipo:string){
    let formateadas=[];
    console.log("Estoy aca",magnitudes.length)
    if(magnitudes.length > 90){
        for(let k=magnitudes.length-60;k<magnitudes.length;k++){
        //Obtengo la fecha
        let f = magnitudes[k].fecha;
        let d = new Date(f);
        console.log(d.getHours())
        let fFormateada = `${d.getDate()}/${d.getHours()}:${d.getMinutes()}`;
        formateadas.push({
            fecha:fFormateada,
            valor:magnitudes[k].valor,
        tipo:magnitudes[k].tipo.tipo})
        }
    }else{
        for(let k=0;k<magnitudes.length;k++){
        //Obtengo la fecha
        let f = magnitudes[k].fecha;
        let d = new Date(f);
        let fFormateada;
        console.log("Tipo: ",tipo)
        switch(tipo){
             default:{
                  fFormateada = `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${d.getMinutes()}`;
                  break;
            }
            case "1h":{
                fFormateada = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
                break;
            }
            case "24h":{
                fFormateada = `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}`;
                break;
            }
            case "7d":{
                fFormateada = `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}`;
                break;
            }
            case "mes":{
                fFormateada = `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}`;
                break;
            }
            case "Personalizado":{
                fFormateada = `${d.getDate()}/${d.getMonth()+1}-${d.getHours()}`;
                break;
            }
        }
        formateadas.push({
            fecha:fFormateada,
            valor:magnitudes[k].valor,
        tipo:magnitudes[k].tipo.tipo})
    }
    }
    //console.log(formateadas)
    return formateadas
}
//En esta función se junta los datos en una sola unidad
//{fecha:valor,corriente:valor,tension:valor,carga:valor,temperatura:valor}
//Con ese formato voy a poder gráficar todos los valores.
export function formatearParaGraficar(magnitudes:any){
     let formateo = []
     for(let m=0;m<magnitudes.length/4;m++){
        formateo.push({
        fecha:magnitudes[4*m].fecha,
        carga:magnitudes[4*m].valor,
        corriente:magnitudes[4*m+1].valor,
        tension:magnitudes[4*m+2].valor,
        temperatura:magnitudes[4*m+3].valor});
     }
    // console.log(formateo)
     return formateo;
}