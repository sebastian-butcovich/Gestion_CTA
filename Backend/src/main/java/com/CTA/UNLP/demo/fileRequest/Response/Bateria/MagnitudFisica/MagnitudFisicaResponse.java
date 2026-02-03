package com.CTA.UNLP.demo.fileRequest.Response.Bateria.MagnitudFisica;

import com.CTA.UNLP.demo.modelo.Bateria.TipoMagnitud;

import java.util.Date;

public record MagnitudFisicaResponse(double valor, TipoMagnitud tipo, Date fecha, Long idBateria) {
}
