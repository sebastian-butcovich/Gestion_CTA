import AddButton from '@/component/basic/addButton/AddButton'
import React, { useState } from 'react'
import "./estilosProyectos.scss"
import FormularioAgregarProyecto from './agregarProyecto/FormularioAgregarProyecto'
function Proyectos() {
  const[mostrarFormularioAgregar,setMostrarFormularioAgregar] = useState<Boolean>(false)
  const handleAddProject = ()=>{ 
    setMostrarFormularioAgregar(!mostrarFormularioAgregar)
  }
  return (
    <div className='contenedor_proyectos'><h1>Proyectos</h1>
    <AddButton onClick={handleAddProject}></AddButton>
    {mostrarFormularioAgregar ? <FormularioAgregarProyecto isOpen={mostrarFormularioAgregar} onClose={()=>setMostrarFormularioAgregar(false)}/>:null}
       </div>
  )
}

export default Proyectos