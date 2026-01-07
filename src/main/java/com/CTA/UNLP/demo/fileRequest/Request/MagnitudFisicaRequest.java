package com.CTA.UNLP.demo.fileRequest.Request;

import com.CTA.UNLP.demo.modelo.Bateria.MagnitudFisica;

import java.util.Date;

public record MagnitudFisicaRequest(Long id, double valor, MagnitudFisica.Tipo tipo, Date fecha,Long idBateria) {

}
