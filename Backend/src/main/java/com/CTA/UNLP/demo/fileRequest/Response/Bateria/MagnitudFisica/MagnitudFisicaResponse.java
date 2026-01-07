package com.CTA.UNLP.demo.fileRequest.Response.Bateria.MagnitudFisica;

import com.CTA.UNLP.demo.modelo.Bateria.MagnitudFisica;

import java.util.Date;

public record MagnitudFisicaResponse(double valor, MagnitudFisica.Tipo tipo, Date fecha, Long idBateria) {
}
