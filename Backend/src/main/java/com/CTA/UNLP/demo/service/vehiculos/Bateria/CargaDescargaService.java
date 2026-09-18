package com.CTA.UNLP.demo.service.vehiculos.Bateria;

import com.CTA.UNLP.demo.fileRequest.Request.CargaDescargaIn;
import com.CTA.UNLP.demo.fileRequest.Response.Bateria.RespuestaGenerica;
import com.CTA.UNLP.demo.modelo.Bateria.Bateria;
import com.CTA.UNLP.demo.modelo.Bateria.CargaDescarga;
import com.CTA.UNLP.demo.repository.Bateria.BateriaRepository;
import com.CTA.UNLP.demo.repository.Bateria.CargaDescargaRespository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Data
public class CargaDescargaService {
    private final BateriaRepository bateriaRepository;
    private final CargaDescargaRespository cargaDescargaRepository;
    public ResponseEntity<RespuestaGenerica> agregarCargaDescarga(CargaDescargaIn cd){
        if(!verificarDatos(cd)){
            return ResponseEntity.badRequest().body(new RespuestaGenerica(1,"Datos incorrectos"));
        }else{
            CargaDescarga cargaDescarga = new CargaDescarga();
            Bateria bateria = bateriaRepository.findById(cd.idBateria()).orElse(null);
            if(bateria == null){
                return ResponseEntity.badRequest().body(new RespuestaGenerica(2,"El bateria no existe"));
            }
            cargaDescarga.setFechaEntrada(cd.fechaEntrada());
            cargaDescarga.setFechaInicioCarga(cd.inicioCarga());
            cargaDescarga.setFechaFinCarga(cd.finCarga());
            cargaDescarga.setCarga(cd.carga());
            cargaDescarga.setFechaInicioDescarga(cd.inicioDescarga());
            cargaDescarga.setFechaFinDescarga(cd.finDescarga());
            cargaDescarga.setDescarga(cd.descarga());
            cargaDescarga.setDiferenciaCarga(cd.diferenciaCarga());
            cargaDescarga.setDiferenciaDesarga(cd.diferenciaDescarga());
            cargaDescarga.setBateria(bateria);
            cargaDescargaRepository.save(cargaDescarga);
            return ResponseEntity.status(HttpStatus.CREATED).body(new RespuestaGenerica(cargaDescarga.getId().intValue(),"Carga descarga agregada"));
        }
    }
    private boolean verificarDatos(CargaDescargaIn cd){
        return cd != null && (
                cd.idBateria() != null &&
                cd.idBateria() > 0 ||
                cd.finCarga() != null &&
                cd.inicioCarga()!= null &&
                cd.inicioDescarga() != null &&
                cd.finDescarga() !=null &&
                cd.fechaEntrada() != null &&
                cd.carga() > 0.0 &&
                cd.descarga() < 0.0);
    }
    public ResponseEntity<List<CargaDescargaIn>> obtenerCargasDescargas(Long idBateria){
        return null;
    }
}
