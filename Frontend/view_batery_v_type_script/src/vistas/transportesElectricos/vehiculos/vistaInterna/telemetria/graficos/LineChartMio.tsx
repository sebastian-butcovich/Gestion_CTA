import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

export function LineChartMio({ datos }: { datos: any }) {
    return (
        <ResponsiveContainer width="100%" height="auto" aspect={16 / 9}>
            <LineChart 
                data={datos}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            >
                {/* Cuadrícula de fondo sutil para orientar la vista */}
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

                {/* Eje X estilizado: fuente más limpia y rotación de fechas optimizada */}
                <XAxis 
                    dataKey="fecha" 
                    interval="preserveStartEnd" 
                    angle={-30}  
                    stroke="#64748b" 
                    fontSize={15} 
                    height={50}
                    tick={{ fill: '#94a3b8' }}
                />

                {/* Eje Y limpio con tonos neutros */}
                <YAxis 
                    stroke="#64748b" 
                    fontSize={15} 
                    tick={{ fill: '#94a3b8' }}
                    domain={['auto', 'auto']}
                />

                {/* Tooltip moderno con bordes redondeados y sombra */}
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: "#0f172a", 
                        border: "1px solid #334155", 
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                        color: "#f8fafc"
                    }} 
                    itemStyle={{ color: "#e2e8f0", padding: "2px 0" }}
                    labelStyle={{ color: "#94a3b8", fontWeight: "bold", marginBottom: "4px" }} 
                />

                {/* Leyenda superior ordenada */}
                <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '12px' }} />

                {/* Líneas suavizadas (monotone), sin puntos saturados y con trazo elegante */}
                <Line 
                    type="monotone" 
                    dataKey="tension" 
                    name="Tensión (V)"
                    stroke="#f97316" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} 
                />
                <Line 
                    type="monotone" 
                    dataKey="corriente" 
                    name="Corriente (A)"
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, fill: "#ef4444", stroke: "#fff", strokeWidth: 2 }} 
                />
                <Line 
                    type="monotone" 
                    dataKey="temperatura" 
                    name="Temperatura (°C)"
                    stroke="#eab308" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, fill: "#eab308", stroke: "#fff", strokeWidth: 2 }} 
                />
                <Line 
                    type="monotone" 
                    dataKey="carga" 
                    name="Carga (SOC)"
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, fill: "#22c55e", stroke: "#fff", strokeWidth: 2 }} 
                />
            </LineChart> 
        </ResponsiveContainer>
    );
}