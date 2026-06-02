package com.CTA.UNLP.demo.controller.vehiculos;

import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.service.vehiculos.VehiculoService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vehiculos")

public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;
    @GetMapping
    public List<Vehiculo> obtenerTodosLosVehiculos(){
        return vehiculoService.obtenerTodosLosVehiculos();
    }
}
