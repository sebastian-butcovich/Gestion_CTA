import React,{useEffect, useState} from "react";
import { obtenerDatosMagnitudes } from "../util/request/magnitudes";
export function PaginaPrincipal() {
    const [magnitudes, setMagnitudes] = useState([])
    async function test(){
        const response = await obtenerDatosMagnitudes(1);
        console.log(response.data)
        if(response.status == 200){
            setMagnitudes(response.data.magnitudFisicaResponses)
            //Necesitas una recarga para que muestre los datos. 
            console.log("Se muestra magnitudes",magnitudes)
        }
      }
      useEffect(()=>{
       test();
      },[])
    return (
   <div>
    <h1>Página Principal</h1>
    <div>
        <ul>
            {magnitudes.length !=0 && magnitudes != null && magnitudes != undefined? magnitudes.map(item=>(
                <li key={item.valor}>{item.tipo }{item.valor}</li>
            )):0}
        </ul>
    </div>
   </div>
  );
}