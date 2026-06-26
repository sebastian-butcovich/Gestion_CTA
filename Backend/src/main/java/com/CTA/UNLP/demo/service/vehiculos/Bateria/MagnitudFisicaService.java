package com.CTA.UNLP.demo.service.vehiculos.Bateria;

import com.CTA.UNLP.demo.fileRequest.Request.FiltroRequest;
import com.CTA.UNLP.demo.fileRequest.Request.MagnitudFisicaRequest;
import com.CTA.UNLP.demo.fileRequest.Response.Bateria.MagnitudFisica.ListMagnitudFisicas;
import com.CTA.UNLP.demo.fileRequest.Response.Bateria.MagnitudFisica.MagnitudFisicaResponse;
import com.CTA.UNLP.demo.modelo.Bateria.Bateria;
import com.CTA.UNLP.demo.modelo.Bateria.MagnitudFisica;
import com.CTA.UNLP.demo.modelo.Partes.Partes;
import com.CTA.UNLP.demo.modelo.Ubicacion;
import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.repository.Bateria.BateriaRepository;
import com.CTA.UNLP.demo.repository.Bateria.MagnitudFisicaRepository;
import com.CTA.UNLP.demo.repository.VehiculoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MagnitudFisicaService {
    private final MagnitudFisicaRepository magnitudFisicaRepository;
    private final BateriaRepository bateriaRepository;
    private final VehiculoRepository vehiculoRepository;
    @Transactional
    public Long agregarMagnitudFisica(List<MagnitudFisicaRequest> magnitudFisicaRequest){
            if(magnitudFisicaRequest.getFirst().idBateria() == null || magnitudFisicaRequest.getFirst().idBateria() <= 0){
                //Tengo que agregar un vehículo y una batería
                Vehiculo v = new Vehiculo();
                v.setNombre("PENDIENTE_CONFIGURACION");
                Ubicacion u = new Ubicacion();
                u.setPais("PENDIENTE_CONFIGURACION");
                u.setProvincia("PENDIENTE_CONFIGURACION");
                u.setCiudad("PENDIENTE_CONFIGURACION");
                u.setCalle("PENDIENTE_CONFIGURACION");
                u.setNumero("PENDIENTE_CONFIGURACION");
                v.setUbicacion(u);
                Bateria b = new Bateria();
                b.setNombre("PENDIENTE_CONFIGURACION");
                b.setNumero_celdas(-1);
                b.setMagnitudes(new ArrayList<MagnitudFisica>());
                for(MagnitudFisicaRequest i:magnitudFisicaRequest) {
                    MagnitudFisica m = new MagnitudFisica();
                    m.setMagnitud(i.tipo());
                    m.setValor(i.valor());
                    m.setFecha(i.fecha());
                    b.getMagnitudes().add(m);
                    m.setBateria(b);
                }
                v.setBateria(b);
                vehiculoRepository.save(v);
                return b.getId();
            }else{
                Long idBateria = magnitudFisicaRequest.getFirst().idBateria();
                Bateria b = bateriaRepository.findById(idBateria).orElseThrow();
                for(MagnitudFisicaRequest i:magnitudFisicaRequest) {
                    MagnitudFisica m = new MagnitudFisica();
                    m.setBateria(b);
                    m.setFecha(i.fecha());
                    m.setValor(i.valor());
                    m.setMagnitud(i.tipo());
                   b.getMagnitudes().add(m);
                }
                bateriaRepository.save(b);
                return b.getId();
            }
    }
public ResponseEntity<ListMagnitudFisicas> obtenerMagnitudes(Long idBateria){
    Optional<Bateria> b = bateriaRepository.findById(idBateria);
    if(b.isEmpty()){
        return ResponseEntity.badRequest().body(new ListMagnitudFisicas(null,"No existe un id de bateria" + idBateria));
    }
        List<MagnitudFisica> magnitudesFisicas = magnitudFisicaRepository.findByBateriaId(idBateria);
        if(magnitudesFisicas.isEmpty()){
            return ResponseEntity.ok(new ListMagnitudFisicas(new ArrayList<MagnitudFisicaResponse>(),"No hay magnitudes asociadas a esta id de bateria"+idBateria));
        }
        return formatearDatos(magnitudesFisicas,idBateria);
}
private ResponseEntity<ListMagnitudFisicas> formatearDatos(List<MagnitudFisica> magnitudesFisicas, Long idBateria) {
    List<MagnitudFisicaResponse> magnitudFisicaResponses = new ArrayList<MagnitudFisicaResponse>();
    for(MagnitudFisica m: magnitudesFisicas){
        MagnitudFisicaResponse aux = new MagnitudFisicaResponse(m.getValor(),m.getMagnitud(),m.getFecha(),m.getBateria().getId());
        magnitudFisicaResponses.add(aux);
    }
    return  ResponseEntity.ok(new ListMagnitudFisicas(magnitudFisicaResponses,"Las magnitudes fisicas asociadas a la bateria "+idBateria));
}
    public ResponseEntity<ListMagnitudFisicas> obtenerMagnitudFisicaFiltrada(Long idBateria, FiltroRequest filtro){
        //Preguntar o hacer un switch sobre que filtro llego
        List<MagnitudFisica> datos;
        LocalDateTime fechaInicio;
        LocalDateTime fechaFin;
        switch (filtro.tipo()){
            case "1h":{fechaInicio =  LocalDateTime.now().minusHours(1);
                fechaFin = LocalDateTime.now();
                break;
            }
            case "24h":{
                fechaInicio =  LocalDateTime.now().minusDays(1);
                fechaFin = LocalDateTime.now();
                break;}
            case "7d":{
                fechaInicio =  LocalDateTime.now().minusDays(7);
                fechaFin = LocalDateTime.now();
                break;
            }
            case "mes":{
                fechaInicio =  LocalDateTime.now().minusMonths(1);
                fechaFin = LocalDateTime.now();;
                break;
            }
            case "Personalizado":{
                fechaInicio =  LocalDateTime.of(filtro.anioInicio(),filtro.mesInicio(),filtro.diaInicio(),filtro.hInicio(),filtro.minutos());
                fechaFin = LocalDateTime.of(filtro.anioFin(),filtro.mesFin(),filtro.diaFin(),filtro.hFin(),filtro.minutos());
                break;
            }
            default:{
                fechaInicio =  LocalDateTime.now().minusDays(2);
                fechaFin = LocalDateTime.now();
                break;
            }

        }
        if(filtro.tipo().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        datos = magnitudFisicaRepository.findByFecha(idBateria,fechaInicio,fechaFin);
        int paso = datos.size()/(15);
        List<MagnitudFisica> resultado = new ArrayList<MagnitudFisica>();
        for(int i=0; i<datos.size()-3; i+=paso){
            resultado.add(datos.get(i));
            resultado.add(datos.get(i+1));
            resultado.add(datos.get(i+2));
            resultado.add(datos.get(i+3));
        }
        return formatearDatos(resultado,idBateria);
    }

}
