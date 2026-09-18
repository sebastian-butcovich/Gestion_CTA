package com.CTA.UNLP.demo.fileRequest.Response.Vehiculo;

import com.CTA.UNLP.demo.modelo.Bateria.Bateria;
import com.CTA.UNLP.demo.modelo.Ubicacion;

public record VehiculoResponse(
        Long id,
        String nombre,
        Bateria bateria,
        Ubicacion ubicacion
) {
}
