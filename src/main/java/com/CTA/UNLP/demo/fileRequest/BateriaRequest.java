package com.CTA.UNLP.demo.fileRequest;

import com.CTA.UNLP.demo.modelo.Vehiculo;

import java.util.Date;

public record BateriaRequest(Long id, double bateria, Date fecha, Vehiculo vehiculo) {

}
