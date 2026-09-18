package com.CTA.UNLP.demo.fileRequest.Request;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public record CargaDescargaIn(
        Long id,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        Date fechaEntrada,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        Date inicioDescarga,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        Date finDescarga,
        Double descarga,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        Date inicioCarga,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        Date finCarga,
        Double carga,
        Double diferenciaDescarga,
        Double diferenciaCarga,
        Long idBateria
) {
}
