import { GlowingLineChart } from "@/components/ui/glowing-line";
import "./telemetria.scss"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// Definimos la interfaz para tipar los datos históricos que vienen del backend
interface MagnitudData {
  time: string; // El eje X (ej: "16:03")
  bateria_1: number;
  bateria_2: number;
}
export function Telemetria(){
    const location = useLocation()
    const id = location.state.id
    // Estado para el filtro temporal (por defecto traemos la última hora)
  const [timeRange, setTimeRange] = useState<string>("1h");
  const [chartData, setChartData] = useState<MagnitudData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Cada vez que cambie el timeRange, se dispara la consulta al backend
  useEffect(() => {
    const fetchHistorial = async () => {
      setLoading(true);
      try {
        // Tu llamada a la API de Spring Boot pasando el rango como query param
        const response = await fetch(`/api/magnitudes/historial?range=${timeRange}`);
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error al traer el historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [timeRange]);
    return(<div className="contenedor" >
        <h1 className="titulo">Telemetria del automóvil</h1>
        <GlowingLineChart id={id}/>
    </div>)
}