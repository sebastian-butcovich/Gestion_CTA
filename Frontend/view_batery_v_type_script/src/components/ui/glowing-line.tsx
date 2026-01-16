"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { obtenerMagnitudes } from "@/util/peticiones/peticionesMagnitud";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { formatearDatos, formatearParaGraficar } from "@/util/formatearDatos";

const chartData = [
  { month: "January", desktop: 186, mobile: 87, nuevo: 44 },
  { month: "February", desktop: 305, mobile: 163, nuevo: 454 },
  { month: "March", desktop: 237, mobile: 142, nuevo: 54 },
  { month: "April", desktop: 73, mobile: 195, nuevo: 34 },
  { month: "May", desktop: 209, mobile: 118, nuevo: 24 },

];

const chartConfig = {
  carga: {
    label: "Corriente",
    color: "var(--chart-1)",
  },
  corriente: {
    label: "Carga",
    color: "var(--chart-2)",
  },
  tension: {
    label: "Tensión",
    color: "var(--chart-3)",
  },
  temperatura:{
    label:"Temperatura",
    color:"var(--chart-4)"
  }
} satisfies ChartConfig;
//Función que grafica lineas 
export function GlowingLineChart() {
  //Guarda la respuesta de la última petición realizada
  const [magnitudes, setMagnitudes] = useState([]);
  //Guarda los datos formateados para representarlos en el gráfico
  const [datos, setDatos] = useState([{}]);
// Obtiene los datos del servidor 
  async function obtenerDatos() {
    //Obtengo las magnitudes con el formato de la respuesta del back
    const magnitudesResponse = await obtenerMagnitudes();
    //Los guardo
    setMagnitudes(magnitudesResponse);
    //Obtengo una parte de los datos (no quiero todas las entradas ya que pueden ser muchas) y además formateo la fecha de una manera 
    // que me sirva para mostrar
    let dAux = formatearDatos(magnitudesResponse);
    //Formateo los datos para poder mostrarlo en el gráfico
    let fDAux = formatearParaGraficar(dAux);
    setDatos(fDAux);
  }
  useEffect(() => {
    obtenerDatos();
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Micrito 2
          <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>5.2%</span>
          </Badge>
        </CardTitle>
        <CardDescription>Magnitudes - Enero 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={datos}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="fecha"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="corriente"
              type="bump"
              stroke="var(--chart-1)"
              dot={false}
              strokeWidth={2}
              filter="url(#rainbow-line-glow)"
            />
            <Line
              dataKey="carga"
              type="bump"
              stroke="var(--chart-2)"
              dot={false}
              strokeWidth={2}
              filter="url(#rainbow-line-glow)"
            />
            <Line
              dataKey="tension"
              type="bump"
              stroke="var(--chart-3)"
              dot={false}
              strokeWidth={2}
              filter="url(#rainbow-line-glow)"
            />
            <Line
              dataKey="temperatura"
              type="bump"
              stroke="var(--chart-4)"
              dot={false}
              strokeWidth={2}
              filter="url(#rainbow-line-glow)"
            />
            <defs>
              <filter
                id="rainbow-line-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
