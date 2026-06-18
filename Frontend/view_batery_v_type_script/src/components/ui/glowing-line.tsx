"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";


const chartConfig = {
  carga: {
    label: "Carga",
    color: "var(--chart-1)",
  },
  corriente: {
    label: "Corriente",
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
export function GlowingLineChart({datos}:any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {/* Micrito 2 */}
          {/* <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
          </Badge> */}
        </CardTitle>
        {/* <CardDescription>Magnitudes - Enero 2026</CardDescription> */}
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
