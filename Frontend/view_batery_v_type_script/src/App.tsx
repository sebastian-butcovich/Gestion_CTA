import './App.css'
import { Ingreso } from './vistas/ingreso/Ingreso'
import { Registro } from './vistas/ingreso/Registro'
import { Protector } from './vistas/ingreso/Protector'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Proyecto } from './vistas/gerencia/proyectos/Proyecto'
const rutas = createBrowserRouter([
    {
      path: "/",
      element:<Ingreso/>
    },
    {
      path:"registro",
      element:<Registro/>
    },
    {
      path:"/",
      element:<Protector/>,
      children:[
        {
          path:"vistaEntrada",
          element:<Proyecto/>
        }
      ]
    }
])
function App() {
  
  return (
      <RouterProvider router={rutas}></RouterProvider>
  )
}

export default App
