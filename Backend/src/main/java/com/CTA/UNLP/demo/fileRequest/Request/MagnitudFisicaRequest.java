package com.CTA.UNLP.demo.fileRequest.Request;

import com.CTA.UNLP.demo.modelo.Bateria.TipoMagnitud;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public record MagnitudFisicaRequest(Long id, double valor, TipoMagnitud tipo, @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date fecha, Long idBateria) {

}
