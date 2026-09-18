import React from 'react';
import './Switch.scss'; // Asegúrate de crear este archivo de estilos

// 1. Definimos la interfaz para las propiedades (Props) del Switch
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, disabled = false}) => {
  
  // 2. Manejador del cambio de estado del checkbox
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
    localStorage.setItem('switchState', event.target.checked.toString());
  };

  return (
    <div className="switch-wrapper">
      <label>Gráfico con ejes</label>
      <label className={`switch-container ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="switch-checkbox"
      />
      <span className="switch-slider" />
    </label>
    </div>
    
  );
};