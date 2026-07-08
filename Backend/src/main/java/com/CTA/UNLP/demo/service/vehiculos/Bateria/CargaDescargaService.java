package com.CTA.UNLP.demo.service.vehiculos.Bateria;

import com.CTA.UNLP.demo.fileRequest.Response.Bateria.CargaDescarga.CargaDescargaIn;
import com.CTA.UNLP.demo.modelo.Bateria.CargaDescarga;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CargaDescargaService {
    public ResponseEntity<String> agregarCargaDescarga(CargaDescargaIn cd){
        if(verificarDatos(cd)){
            CargaDescarga cargaDescarga = new CargaDescarga();
        }
        return null;
    }
    private boolean verificarDatos(CargaDescargaIn cd){
        return cd != null && (
                cd.idBateria() != null &&
                cd.idBateria() > 0 ||
                cd.cargaFin() != null &&
                cd.cargaInicio()!= null &&
                cd.descargaInicio() != null &&
                cd.descargaFin() !=null &&
                cd.fechaEntrada() != null &&
                cd.carga() > 0.0 &&
                cd.descarga() < 0.0);
    }
    public ResponseEntity<List<CargaDescargaIn>> obtenerCargasDescargas(Long idBateria){
        return null;
    }
}
