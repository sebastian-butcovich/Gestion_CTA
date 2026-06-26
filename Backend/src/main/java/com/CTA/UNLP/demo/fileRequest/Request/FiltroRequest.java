package com.CTA.UNLP.demo.fileRequest.Request;

public record FiltroRequest(
        int minutos,
        int hInicio,
        int hFin,
        int diaInicio,
        int diaFin,
        int mesInicio,
        int mesFin,
        int anioInicio,
        int anioFin,
        String tipo
) {
}
