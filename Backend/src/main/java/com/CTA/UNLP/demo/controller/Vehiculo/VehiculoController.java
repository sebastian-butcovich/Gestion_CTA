package com.CTA.UNLP.demo.controller.Vehiculo;

import com.CTA.UNLP.demo.fileRequest.Response.Vehiculo.VehiculoResponse;
import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.service.vehiculos.Vehiculo.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<VehiculoResponse> obtenerTodosLosVehiculos(){
        return vehiculoService.obtenerTodosLosVehiculos();
    }
    @GetMapping("/{id}")
    public ResponseEntity<VehiculoResponse> obtenerVehiculoPorId(@PathVariable Integer id){
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
