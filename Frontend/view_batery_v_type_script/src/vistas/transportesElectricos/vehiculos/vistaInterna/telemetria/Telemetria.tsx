import { GlowingLineChart } from "@/components/ui/glowing-line";
import "./telemetria.scss"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Filtro } from "@/util/peticiones/peticionesMagnitud";
import { obtenerVehiculo } from "@/util/peticiones/peticionesVehiculos";
import { formatearDatos, formatearParaGraficar } from "@/util/formatearDatos";
import { obtenerMagnitudes, obtenerMagnitudesFiltradas } from "@/util/peticiones/peticionesMagnitud";
import Swal from "sweetalert2";
export function Telemetria() {
  const location = useLocation()
  const id = location.state.id
  // Estado para el filtro temporal (por defecto traemos la última hora)
  const [timeRange, setTimeRange] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [horaInicio, setHoraInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [horaFin, setHoraFin] = useState<string>("");
  const [nombreVehiculo, setNombreVehiculo] = useState<string>("NOMBRE NO DISPONIBLE")
  const [filtro, setFiltro] = useState<Filtro>({
    minutos: 0.0,
    hInicio: 0.0,
    hFin: 0.0,
    diaInicio: 0.0,
    diaFin: 0.0,
    mesInicio: 0.0,
    mesFin: 0.0,
    anioInicio: 0.0,
    anioFin: 0.0,
    tipo:""
  })
  const aplicarFiltroPersonalizado = () => {
    if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) {
      alert("Por favor, completa todos los campos de fecha y hora.");
      return;
    }

    const [anioIn, mesIn, diaIn] = fechaInicio.split("-").map(Number);
    const [horaIn] = horaInicio.split(":").map(Number);
    const [anioFi, mesFi, diaFi] = fechaFin.split("-").map(Number);
    const [horaFi, minFi] = horaFin.split(":").map(Number);

    setFiltro({
      minutos: minFi,
      hInicio: horaIn,
      hFin: horaFi,
      diaInicio: diaIn,
      diaFin: diaFi,
      mesInicio: mesIn,
      mesFin: mesFi,
      anioInicio: anioIn,
      anioFin: anioFi,
      tipo: filtro.tipo === "Personalizado"? "":"Personalizado"
    });
    console.log(filtro)
  };
  async function obtenerDatosDelMicro() {
    const response = await obtenerVehiculo(id);
    if (response?.status === 200) {
      setNombreVehiculo(response.data.nombre);
    }else{
      Swal.fire({
        title: "Información no disponible",
        text: "No se pudo obtener el nombre del vehículo",
        icon: "info",
        confirmButtonText: "Aceptar"
      })
    }
  }
  // Cada vez que cambie el timeRange, se dispara la consulta al backend
  useEffect(() => {
    obtenerDatosDelMicro();
  }, [timeRange]);
   //Guarda la respuesta de la última petición realizada
  const [magnitudes, setMagnitudes] = useState([]);
  //Guarda los datos formateados para representarlos en el gráfico
  const [datos, setDatos] = useState([{}]);
// Obtiene los datos del servidor 
  async function obtenerDatos() {
    //Obtengo las magnitudes con el formato de la respuesta del back
    const magnitudesResponse = await obtenerMagnitudes(id);
    formatearDatosParaGrafico(magnitudesResponse);
  }
  async function obtenerDatosFiltrados() {
    //Obtengo las magnitudes con el formato de la respuesta del back
    const magnitudesResponse = await obtenerMagnitudesFiltradas(id, filtro);
    formatearDatosParaGrafico(magnitudesResponse);
  }
  function formatearDatosParaGrafico(magnitudesResponse:any) {
     //Los guardo
    setMagnitudes(magnitudesResponse);
    //Obtengo una parte de los datos (no quiero todas las entradas ya que pueden ser muchas) y además formateo la fecha de una manera 
    // que me sirva para mostrar
    let dAux = formatearDatos(magnitudesResponse,filtro.tipo);
    //Formateo los datos para poder mostrarlo en el gráfico
    let fDAux = formatearParaGraficar(dAux);
    console.log(fDAux);
    setDatos(fDAux);
  }
  useEffect(() => {
    const intervalId = setInterval(()=>{
      if(filtro.tipo === ""){
        console.log("Se obtiene la telemetría sin filtro")
        obtenerDatos();
      }else{
        console.log("Se obtiene la telemetría con filtro")
        obtenerDatosFiltrados();
      }
    },5000);
    return ()=>clearInterval(intervalId)
  }, [filtro])
  return (<div className="contenedor" >
    <h1 className="titulo">Telemetria del automóvil</h1>
    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
      <div className="flex flex-col justify-between items-center" >
        <div>
          <h2 className="text-xl font-semibold text-white">{nombreVehiculo}</h2>
          <p className="text-xs text-slate-400">Magnitudes - Historial</p>
        </div>

        {/* Botonera de Rangos de Tiempo */}
        <div className="flex justify-between bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs w-120 mt-2">
          {[
            { label: "1 Hora", value: "1h" },
            { label: "24 Horas", value: "24h" },
            { label: "7 Días", value: "7d" },
            { label: "Mes actual", value: "Mes" },
            { label: "Personalizado", value: "Personalizado" }
          ].map((item) => (
            <button
              key={item.value}
              onClick={async () => {
                if(timeRange === item.value){
                  setTimeRange("")
                  console.log("timeRange", timeRange)
                  setFiltro({
                  minutos: 0.0,
                  hInicio: 0.0,
                  hFin: 0.0,
                  diaInicio: 0.0,
                  diaFin: 0.0,
                  mesInicio: 0.0,
                  mesFin: 0.0,
                  anioInicio: 0.0,
                  anioFin: 0.0,
                  tipo:""
                })
                }else{
                  setTimeRange(item.value)
                } 
                const fechaHora = new Date()
                switch (item.value) {
                  case "1h": {
                    console.log("Se establece el filtro de 1 hora")
                    filtro.minutos = fechaHora.getMinutes()
                    filtro.hInicio = fechaHora.getHours() - 1
                    filtro.hFin = fechaHora.getHours()
                    //GetDate() -> Te devuelve el día del mes, no getDay(), ese devuelve el día de la semana siendo 0 domingo 6 sabado
                    filtro.diaInicio = filtro.diaFin = fechaHora.getDate()
                    //getMonth() -> Te devuelve el mes anterior al que se está actualmente.
                    filtro.mesInicio = filtro.mesFin = fechaHora.getMonth() + 1
                    filtro.anioInicio = filtro.anioFin = fechaHora.getFullYear()
                    if(filtro.tipo === "1h"){
                      filtro.tipo = ""
                    }else{
                      filtro.tipo = "1h"
                    }
                    break;
                  }
                  case "24h": {
                    filtro.minutos = fechaHora.getMinutes()
                    filtro.hInicio = filtro.hFin = fechaHora.getHours()
                    //GetDate() -> Te devuelve el día del mes, no getDay(), ese devuelve el día de la semana siendo 0 domingo 6 sabado
                    filtro.diaInicio = fechaHora.getDate() - 1
                    filtro.diaFin = fechaHora.getDate()
                    //getMonth() -> Te devuelve el mes anterior al que se está actualmente.
                    filtro.mesInicio = filtro.mesFin = fechaHora.getMonth() + 1
                    filtro.anioInicio = filtro.anioFin = fechaHora.getFullYear()
                    if(filtro.tipo === "24h"){
                      filtro.tipo = ""
                    }else{
                      filtro.tipo = "24h"
                    }
                    break;
                  }
                  case "7d": {
                    filtro.minutos = fechaHora.getMinutes()
                    filtro.hInicio = filtro.hFin = fechaHora.getHours()
                    //GetDate() -> Te devuelve el día del mes, no getDay(), ese devuelve el día de la semana siendo 0 domingo 6 sabado
                    if (fechaHora.getDate() - 7 <= 0) {
                      //Esto me devuelve si el mes anterior tiene 30 o 31 días. 
                      let diasDelMes = new Date(filtro.anioInicio, fechaHora.getMonth(), 0).getDate();
                      filtro.diaInicio = diasDelMes + fechaHora.getDate() - 7
                      filtro.mesInicio = fechaHora.getMonth()
                    } else {
                      filtro.diaInicio = fechaHora.getDate() - 7
                      filtro.mesInicio = fechaHora.getMonth() + 1
                    }
                    filtro.diaFin = fechaHora.getDate()
                    //getMonth() -> Te devuelve el mes anterior al que se está actualmente.
                    filtro.mesFin = fechaHora.getMonth() + 1
                    if (fechaHora.getDate() - 7 < 0 && fechaHora.getMonth() == 0) {
                      filtro.mesInicio = 12
                      let diasDelMes = new Date(filtro.anioInicio, fechaHora.getMonth(), 0).getDate();
                      filtro.diaInicio = diasDelMes + fechaHora.getDate() - 7
                    } else {
                      filtro.anioInicio = filtro.anioFin = fechaHora.getFullYear()
                    }
                     if(filtro.tipo === "7d"){
                      filtro.tipo = ""
                    }else{
                      filtro.tipo = "7d"
                    }
                    break;
                  }
                  case "Personalizado": {
                    //Tengo que seleccionar dos fecha y dos horas
                    if (timeRange == "Personalizado") {
                      setTimeRange("")
                      filtro.diaInicio = filtro.diaFin = 0;
                      filtro.hInicio = filtro.hFin = 0;
                      filtro.mesInicio = filtro.mesFin = 0;
                      filtro.anioInicio = filtro.anioFin = 0;
                    } else {
                      setTimeRange("Personalizado");
                      setFechaInicio("");
                      setHoraInicio("");
                      setFechaFin("");
                      setHoraFin("");
                    }
                    break;
                  }
                  case "Mes": {
                    filtro.diaInicio = 1;
                    filtro.diaFin = fechaHora.getDate()
                    filtro.minutos = fechaHora.getMinutes();
                    filtro.mesInicio = filtro.mesFin = fechaHora.getMonth() + 1
                    filtro.anioInicio = filtro.anioFin = fechaHora.getFullYear()
                    if(filtro.tipo === "mes"){
                      filtro.tipo = ""
                    }else{
                      filtro.tipo = "mes"
                    }
                    break;
                  }
                  case "": {
                    console.log("Se quita el filtro temporal")
                   setFiltro({
                      minutos: 0.0,
                      hInicio: 0.0,
                      hFin: 0.0,
                      diaInicio: 0.0,
                      diaFin: 0.0,
                      mesInicio: 0.0,
                      mesFin: 0.0,
                      anioInicio: 0.0,
                      anioFin: 0.0,
                      tipo:""
                    })
                    break;
                  }
                }            
                  obtenerDatosFiltrados();
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${timeRange === item.value
                ? "bg-emerald-500 text-slate-950 font-medium shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
                }`}
            >
              {item.label}
            </button>

          ))}
        </div>
        {timeRange === "Personalizado" && (
          <div className="flex flex-wrap mt-5 items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs text-white animation-fadeIn">

            {/* Contenedor Desde */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Desde:</span>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Contenedor Hasta */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Hasta:</span>
              <input
                type="date"
                value={fechaFin}
                min={fechaInicio} // Restringe nativamente fechas anteriores al inicio
                onChange={(e) => setFechaFin(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Botón para aplicar el filtro de telemetría */}
            <button
              className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-1.5 rounded transition-colors shadow-md shadow-emerald-500/10"
              onClick={() => aplicarFiltroPersonalizado()}>
              Aplicar Filtro
            </button>
          </div>
        )}
      </div>
      <GlowingLineChart datos={datos} />
    </div>
  </div>)
}