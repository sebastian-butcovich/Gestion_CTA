import { useState, useEffect, useContext } from "react";
import "./formularioVehiculo.scss"
import { modificarDatosVehiculo, obtenerVehiculo } from "@/util/peticiones/peticionesVehiculos";
import type { Vehiculo } from "@/interfaces/Vehiculos";
import { useLocation, useNavigate } from "react-router-dom";
import { VehiculoSeleccionadoContext } from "@/util/contextos/VehiculoSeleccionado";

export default function FormularioVehiculo() {
  const contextVehiculo = useContext(VehiculoSeleccionadoContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Vehiculo>({
    id: null,
    nombre: "",
    ubicacion: {
      id: null,
      pais: "",
      provincia: "",
      ciudad: "",
      calle: "",
      numero: 0
    },
    bateria: {
      id: null,
      nombre: "",
      numero_celdas: 0
    }
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    const keys: string[] = name.split(".");
    console.log("Que haces keys", keys);
    setFormData((prev) => {
      const nuevo: Vehiculo = { ...prev };

      let obj: any = nuevo;
      console.log("Que tiene objeto", obj)
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;

      return nuevo;
    });
  };

  const  handleSubmit = (e:any) => {
    e.preventDefault();

    const datos: any = {
      id: formData?.id,
      nombre: formData?.nombre,
      ubicacion: {
        id:formData.ubicacion.id,
        pais: formData?.ubicacion.pais,
        provincia: formData?.ubicacion.provincia,
        ciudad: formData?.ubicacion.ciudad,
        calle: formData?.ubicacion.calle,
        numero: formData?.ubicacion.numero,
      },
      bateria: {
        id: formData.bateria.id,
        nombre: formData?.bateria.nombre,
        numero_celdas: formData?.bateria.numero_celdas,
      },
    };


    modificarDatosVehiculo(datos).then(response=>{
    if(response.status == 200){
      navigate("/vehiculos")
    }
    }).catch(error=>{
      console.log(error);
    });
    
  };
  async function obtenerDatosDelVehiculo() {
    // const id = location.state.id
    // const respuesta = await obtenerVehiculo(id);
    // if (respuesta != undefined && respuesta.status == 200) {
    //   if (formData != undefined && formData != null) {
    //     let aux: Vehiculo = {
    //       id: null,
    //       nombre: "",
    //       ubicacion: {
    //         id: null,
    //         pais: "",
    //         provincia: "",
    //         ciudad: "",
    //         calle: "",
    //         numero: 0
    //       },
    //       bateria: {
    //         id: null,
    //         nombre: "",
    //         numero_celdas: 0
    //       }
    //     }
        // aux.id = respuesta.data.id
        // aux.nombre = respuesta.data.nombre
        // aux.ubicacion.id = respuesta.data.ubicacion.id
        // aux.ubicacion.pais = respuesta.data.ubicacion.pais
        // aux.ubicacion.provincia = respuesta.data.ubicacion.provincia
        // aux.ubicacion.ciudad = respuesta.data.ubicacion.ciudad
        // aux.ubicacion.calle = respuesta.data.ubicacion.calle
        // aux.ubicacion.numero = respuesta.data.ubicacion.numero
        // aux.bateria.id = respuesta.data.bateria.id
        // aux.bateria.nombre = respuesta.data.bateria.nombre
        // aux.bateria.numero_celdas = respuesta.data.bateria.numero_celdas
    //     setFormData(context)
    //   } else {
    //     console.log("Error al obtener los datos de configuración")
    //   }
    // }
    if(contextVehiculo != undefined && contextVehiculo.vehiculoSeleccionado != undefined){
      console.log(contextVehiculo.vehiculoSeleccionado);
      setFormData(contextVehiculo.vehiculoSeleccionado);
    }else{
      throw new Error("El contexto del vehiculo no existe en el formulario");
    }
  }
  useEffect(() => {
    obtenerDatosDelVehiculo();
  }, [])
  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Vehículo</h2>

      <div>
        <label>Nombre del vehículo</label>
        <input
          type="text"
          name="nombre"
          value={formData?.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <h3>Ubicación</h3>

      <div>
        <label>País</label>
        <input
          type="text"
          name="ubicacion.pais"
          value={formData?.ubicacion.pais}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Provincia</label>
        <input
          type="text"
          name="ubicacion.provincia"
          value={formData?.ubicacion.provincia}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Ciudad</label>
        <input
          type="text"
          name="ubicacion.ciudad"
          value={formData?.ubicacion.ciudad}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Calle</label>
        <input
          type="text"
          name="ubicacion.calle"
          value={formData?.ubicacion.calle}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Número</label>
        <input
          type="text"
          name="ubicacion.numero"
          value={formData?.ubicacion.numero}
          onChange={handleChange}
          required
        />
      </div>

      <h2>Batería</h2>

      <div>
        <label>Nombre de la batería</label>
        <input
          type="text"
          name="bateria.nombre"
          value={formData?.bateria.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Número de celdas</label>
        <input
          type="number"
          min="1"
          name="bateria.numero_celdas"
          value={formData?.bateria.numero_celdas}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">
        Guardar Vehículo y Batería
      </button>
    </form>
  );
}