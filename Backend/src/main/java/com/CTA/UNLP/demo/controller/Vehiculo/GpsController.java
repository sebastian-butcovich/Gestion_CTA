package com.CTA.UNLP.demo.controller.Vehiculo;

import com.CTA.UNLP.demo.fileRequest.Request.GpsRequest;
import com.CTA.UNLP.demo.modelo.Gps;
import com.CTA.UNLP.demo.repository.Vehiculo.GpsRepository;
import com.CTA.UNLP.demo.service.vehiculos.Vehiculo.GpsService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/gps")
@RestController
@RequiredArgsConstructor
@Data
@CrossOrigin("*")
public class GpsController {
    private final GpsService gpsService;
    @GetMapping
    public ResponseEntity<List<Gps>> obtenerGps() {
        return gpsService.obtenerGps();
    }
    @PostMapping
    public ResponseEntity<String> agregarEntradaGps(@RequestBody GpsRequest gps) {
        return gpsService.agregarEntradaGps(gps);
    }
}
