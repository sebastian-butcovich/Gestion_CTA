package com.CTA.UNLP.demo.controller.Bateria;

import com.CTA.UNLP.demo.fileRequest.Request.CargaDescargaIn;
import com.CTA.UNLP.demo.fileRequest.Response.Bateria.RespuestaGenerica;
import com.CTA.UNLP.demo.service.vehiculos.Bateria.CargaDescargaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cargaDescarga")
@AllArgsConstructor
public class CargaDescargaController {
    private  CargaDescargaService cargaDescargaService;
    @PostMapping
    public ResponseEntity<RespuestaGenerica> agregarCargaDescarga(@RequestBody CargaDescargaIn cd){
        return cargaDescargaService.agregarCargaDescarga(cd);
    }
    @GetMapping
    public ResponseEntity<List<CargaDescargaIn>> obtenerCargasDescargas(Long idBateria){
        return cargaDescargaService.obtenerCargasDescargas(idBateria);
    }
}
