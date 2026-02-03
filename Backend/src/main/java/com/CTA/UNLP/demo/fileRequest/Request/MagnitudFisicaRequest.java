package com.CTA.UNLP.demo.fileRequest.Request;

import com.CTA.UNLP.demo.modelo.Bateria.TipoMagnitud;

import java.util.Date;

public record MagnitudFisicaRequest(Long id, double valor, TipoMagnitud tipo, Date fecha, Long idBateria) {

}
