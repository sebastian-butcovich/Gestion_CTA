package com.CTA.UNLP.demo.controller.Bateria;

import com.CTA.UNLP.demo.fileRequest.Response.Bateria.CargaDescarga.CargaDescargaIn;
import com.CTA.UNLP.demo.service.vehiculos.Bateria.CargaDescargaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("cargaDescarga")
@AllArgsConstructor
public class CargaDescargaController {
    private  CargaDescargaService cargaDescargaService;
    @PostMapping
    public ResponseEntity<String> agregarCargaDescarga(CargaDescargaIn cd){
        return cargaDescargaService.agregarCargaDescarga(cd);
    }
    @GetMapping
    public ResponseEntity<List<CargaDescargaIn>> obtenerCargasDescargas(Long idBateria){
        return cargaDescargaService.obtenerCargasDescargas(idBateria);
    }
}
