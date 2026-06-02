package com.CTA.UNLP.demo.service.vehiculos;

import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.repository.VehiculoRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@NoArgsConstructor
public class VehiculoService {
    @Autowired
    private   VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerTodosLosVehiculos(){
        List<Vehiculo> vehiculos = this.vehiculoRepository.findAll();
        return vehiculos;
    }
}
