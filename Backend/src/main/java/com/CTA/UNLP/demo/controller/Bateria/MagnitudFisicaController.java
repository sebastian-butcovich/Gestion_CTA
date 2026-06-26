package com.CTA.UNLP.demo.controller.Bateria;

import com.CTA.UNLP.demo.fileRequest.Request.FiltroRequest;
import com.CTA.UNLP.demo.fileRequest.Request.MagnitudFisicaRequest;
import com.CTA.UNLP.demo.fileRequest.Response.Bateria.MagnitudFisica.ListMagnitudFisicas;
import com.CTA.UNLP.demo.modelo.Bateria.MagnitudFisica;
import com.CTA.UNLP.demo.service.vehiculos.Bateria.MagnitudFisicaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/magnitud")
public class MagnitudFisicaController {
    private final MagnitudFisicaService magnitudFisicaService;
    @PostMapping
    public Long agregarMagnitudFisica(@RequestBody List<MagnitudFisicaRequest> mfr){
        return magnitudFisicaService.agregarMagnitudFisica(mfr);
    }
    @GetMapping
    public ResponseEntity<ListMagnitudFisicas> obtenerMagnitudes(@RequestParam("idBateria") Long idBateria){
        return magnitudFisicaService.obtenerMagnitudes(idBateria);
    }
    @PostMapping(value = "/{id}")
    public ResponseEntity<ListMagnitudFisicas> obtenerMagnitudesFiltradas(@PathVariable("id") Long idBateria,  @RequestBody FiltroRequest filtro){
        return magnitudFisicaService.obtenerMagnitudFisicaFiltrada(idBateria,filtro);
    }
}
