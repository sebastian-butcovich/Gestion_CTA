import "./App.css";
import { Registro } from "./vistas/ingreso/Registro";
import { Protector } from "./vistas/ingreso/Protector";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Proyecto } from "./vistas/gerencia/proyectos/Proyecto";
import { BasicView } from "./vistas/VistaGeneral";
import { VehiculosElectricos } from "./vistas/transportesElectricos/vehiculos/Vehiculos";
import { VistaInternaVehiculo } from "./vistas/transportesElectricos/vehiculos/vistaInterna/VistarInternaVehiculo";
import { Telemetria } from "./vistas/transportesElectricos/vehiculos/vistaInterna/telemetria/Telemetria";
import { Partes } from "./vistas/transportesElectricos/vehiculos/vistaInterna/partes/Partes";
import Proyectos from "./vistas/gerencia/proyectos/Proyectos";
import Configuracion from "./vistas/transportesElectricos/vehiculos/vistaInterna/configuracion/Configuracion";
const rutas = createBrowserRouter([
  {
    path: "/",
    element: <BasicView />,
    children: [
      {
        path: "/",
        element: <Proyectos />
      },
      {
        path: "vehiculos",
        element: <VehiculosElectricos />,
      },
      {
        path: "vistaInterna",
        element: <VistaInternaVehiculo />,
      },
      {
        path: "telemetria",
        element: <Telemetria />
      },
      {
        path: "partes",
        element: <Partes />
      },
      {
        path: "configuracion",
        element: <Configuracion />
      }
    ],
  },
  {
    path: "registro",
    element: <Registro />,
  },
  //A partir de acá, todos estas direcciones tienen que estar protegidas
  {
    path: "/",
    element: <Protector />,
    children: [
      {
        path: "vistaEntrada",
        element: <Proyecto />,
      },
      {
        path: "vehiculos",
        element: <VehiculosElectricos />,
      },
    ],
  },
]);
function App() {
  return (
      <RouterProvider router={rutas}></RouterProvider>)
}
export default App;