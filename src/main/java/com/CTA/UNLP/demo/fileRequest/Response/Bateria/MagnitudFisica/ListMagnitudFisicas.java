package com.CTA.UNLP.demo.fileRequest.Response.Bateria.MagnitudFisica;

import java.util.List;

public record ListMagnitudFisicas(List<MagnitudFisicaResponse> magnitudFisicaResponses, String mensaje) {
}
