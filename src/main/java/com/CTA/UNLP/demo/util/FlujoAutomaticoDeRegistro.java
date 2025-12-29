package com.CTA.UNLP.demo.util;

import com.CTA.UNLP.demo.modelo.Bateria.MagnitudFisica;
import com.CTA.UNLP.demo.repository.Bateria.BateriaRepository;
import com.CTA.UNLP.demo.repository.VehiculoRepository;
import lombok.RequiredArgsConstructor;

/***
 * Esta clase se utiliza para generar un flujo automático de registro cada vez que un vehículo electrico envía la corriente, temperatura o tensión
 * */
@RequiredArgsConstructor
public class FlujoAutomaticoDeRegistro {
    private VehiculoRepository vehiculoRepository;
    private BateriaRepository bateriaRepository;
    //Esta función en caso de que salga bien, devuelve el ID de la batería
    public Long ingresoAutomatico(MagnitudFisica mf){

    }
}
