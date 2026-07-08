package com.CTA.UNLP.demo.fileRequest.Response.Bateria.CargaDescarga;

import java.util.Date;

public record CargaDescargaIn(
        Long id,
        Long idBateria,
        Date fechaEntrada,
        Date cargaInicio,
        Date cargaFin,
        Date descargaInicio,
        Date descargaFin,
        double carga,
        double descarga
) {
}
