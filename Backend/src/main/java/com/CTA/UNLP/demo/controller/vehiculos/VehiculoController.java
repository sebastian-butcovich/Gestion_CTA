package com.CTA.UNLP.demo.controller.vehiculos;

import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.service.vehiculos.VehiculoService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehiculos")
@CrossOrigin("*")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;
    @GetMapping
    public List<Vehiculo> obtenerTodosLosVehiculos(){
        return vehiculoService.obtenerTodosLosVehiculos();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerVehiculoPorId(@PathVariable Integer id){
        return vehiculoService.obtenerVehiculoPorId(id);
    }
    @PostMapping
    public ResponseEntity<String> modificarVehiculo(@RequestBody Vehiculo vehiculo){
        return vehiculoService.modificarVehiculo(vehiculo);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarVehiculo(@PathVariable Integer id){
        return vehiculoService.eliminarVehiculo(id);
    }
}
