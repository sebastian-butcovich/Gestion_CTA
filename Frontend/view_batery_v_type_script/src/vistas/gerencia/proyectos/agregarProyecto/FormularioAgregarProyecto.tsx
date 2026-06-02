import React from "react";
import "./formularioAgregarProyecto.scss";
type Props = {
  isOpen: Boolean;
  onClose: () => void;
};
function FormularioAgregarProyecto({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Crear Proyecto</h2>
        <form className="project-form">
          <label>Nombre del proyecto</label>
          <input type="text" placeholder="Ej: Proyecto CTA 2026" />
          <label>Cliente</label>
          <input type="text" placeholder="Nombre del cliente" />

          <label>Descripción</label>
          <textarea placeholder="Descripción del proyecto" />

          <div className="modal-buttons">
            <button type="submit" className="btn-save">
              Guardar
            </button>

            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioAgregarProyecto;
