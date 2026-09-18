package com.CTA.UNLP.demo.fileRequest.Request;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public record GpsRequest(
        Double latitud,
        Double longitud,
        Double velocidad,
        Double sentido,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")Date fecha,
        Long idBateria
)
{}