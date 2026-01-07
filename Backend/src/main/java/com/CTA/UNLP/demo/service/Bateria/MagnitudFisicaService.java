package com.CTA.UNLP.demo.service.Bateria;

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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
            if(magnitudFisicaRequest.getFirst().idBateria() == null || magnitudFisicaRequest.getFirst().idBateria() == 0){
                //Tengo que agregar un vehículo y una batería
                Vehiculo v = new Vehiculo();
                v.setNombre("Rellenar");
                Ubicacion u = new Ubicacion();
                u.setPais("Rellenar");
                u.setProvincia("Rellenar");
                u.setCiudad("Rellenar");
                u.setCalle("Rellenar");
                u.setNumero("Rellenar");
                v.setUbicacion(u);
                Bateria b = new Bateria();
                b.setNombre("Rellenar");
                b.setNumero_celdas(-1);
                b.setMagnitudes(new ArrayList<MagnitudFisica>());
                for(MagnitudFisicaRequest i:magnitudFisicaRequest) {
                    MagnitudFisica m = new MagnitudFisica();
                    m.setMagnitud(i.tipo());
                    m.setValor(i.valor());
                    m.setFecha(new Date());
                    b.getMagnitudes().add(m);
                    m.setBateria(b);
                }
                v.setPartes(new ArrayList<Partes>());
                v.getPartes().add(b);
                vehiculoRepository.save(v);
                return b.getId();
            }else{
                Long idBateria = magnitudFisicaRequest.getFirst().idBateria();
                Bateria b = bateriaRepository.findById(idBateria).orElseThrow();
                for(MagnitudFisicaRequest i:magnitudFisicaRequest) {
                    MagnitudFisica m = new MagnitudFisica();
                    m.setBateria(b);
                    m.setFecha(new Date());
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
        List<MagnitudFisicaResponse> magnitudFisicaResponses = new ArrayList<MagnitudFisicaResponse>();
        for(MagnitudFisica m: magnitudesFisicas){
            MagnitudFisicaResponse aux = new MagnitudFisicaResponse(m.getValor(),m.getMagnitud(),m.getFecha(),m.getBateria().getId());
            magnitudFisicaResponses.add(aux);
        }
        return  ResponseEntity.ok(new ListMagnitudFisicas(magnitudFisicaResponses,"Las magnitudes fisicas asociadas a la bateria "+idBateria));
}

}
