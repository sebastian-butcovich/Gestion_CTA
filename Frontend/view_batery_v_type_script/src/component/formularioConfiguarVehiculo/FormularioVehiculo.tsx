import { useState,useEffect } from "react";
import "./formularioVehiculo.scss"
import { obtenerVehiculo } from "@/util/peticiones/peticionesVehiculos";
export default function FormularioVehiculo(id:number) {
  const [formData, setFormData] = useState({
    vehiculo: {
      nombre: "",
      ubicacion: {
        pais: "",
        provincia: "",
        ciudad: "",
        calle: "",
        numero: "",
      },
    },
    bateria: {
      nombre: "",
      numero_celdas: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const keys = name.split(".");

    setFormData((prev) => {
      const nuevo = { ...prev };

      let obj = nuevo;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;

      return nuevo;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      vehiculo: {
        nombre: formData.vehiculo.nombre,
        ubicacion: {
          pais: formData.vehiculo.ubicacion.pais,
          provincia: formData.vehiculo.ubicacion.provincia,
          ciudad: formData.vehiculo.ubicacion.ciudad,
          calle: formData.vehiculo.ubicacion.calle,
          numero: formData.vehiculo.ubicacion.numero,
        },
      },
      bateria: {
        nombre: formData.bateria.nombre,
        numero_celdas: parseInt(formData.bateria.numero_celdas),
        magnitudes: [],
      },
    };

    console.log(datos);

    // Acá podrías hacer el POST al backend
    // axios.post("/api/vehiculos", datos);
  };
  async function obtenerDatosDelVehiculo(){
    const respuesta = await obtenerVehiculo(id);
  }
  useEffect(()=>{
    obtenerDatosDelVehiculo();
  })
  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Vehículo</h2>

      <div>
        <label>Nombre del vehículo</label>
        <input
          type="text"
          name="vehiculo.nombre"
          value={formData.vehiculo.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <h3>Ubicación</h3>

      <div>
        <label>País</label>
        <input
          type="text"
          name="vehiculo.ubicacion.pais"
          value={formData.vehiculo.ubicacion.pais}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Provincia</label>
        <input
          type="text"
          name="vehiculo.ubicacion.provincia"
          value={formData.vehiculo.ubicacion.provincia}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Ciudad</label>
        <input
          type="text"
          name="vehiculo.ubicacion.ciudad"
          value={formData.vehiculo.ubicacion.ciudad}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Calle</label>
        <input
          type="text"
          name="vehiculo.ubicacion.calle"
          value={formData.vehiculo.ubicacion.calle}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Número</label>
        <input
          type="text"
          name="vehiculo.ubicacion.numero"
          value={formData.vehiculo.ubicacion.numero}
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
          value={formData.bateria.nombre}
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
          value={formData.bateria.numero_celdas}
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