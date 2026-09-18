package com.CTA.UNLP.demo.service.vehiculos.Vehiculo;

import com.CTA.UNLP.demo.fileRequest.Request.GpsRequest;
import com.CTA.UNLP.demo.modelo.Bateria.Bateria;
import com.CTA.UNLP.demo.modelo.Gps;
import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.repository.Bateria.BateriaRepository;
import com.CTA.UNLP.demo.repository.Vehiculo.GpsRepository;
import com.CTA.UNLP.demo.repository.Vehiculo.VehiculoRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Data
public class GpsService {
    private final GpsRepository gpsRepository;
    private final VehiculoRepository vehiculoRepository;
    private final BateriaRepository bateriaRepository;
    public ResponseEntity<List<Gps>> obtenerGps() {
        List<Gps> gpss = gpsRepository.findAll();
        if (gpss.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gpss);
    }
    public ResponseEntity<String> agregarEntradaGps(GpsRequest gps) {
        if(!chequearDatos(gps)){
            return ResponseEntity.badRequest().body("No están todos los datos necesarios para agregar la entrada Gps");
        }
        Optional<Bateria> b =bateriaRepository.findById(gps.idBateria());
        if(b.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Optional<Vehiculo> v = vehiculoRepository.findByBateria(b.get());
        if(v.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Gps g = new Gps();
        g.setFecha(gps.fecha());
        g.setVehiculo(v.get());
        g.setLatitud(gps.latitud());
        g.setLongitud(gps.longitud());
        g.setVelocidad(gps.velocidad());
        g.setSentido(gps.sentido());
        gpsRepository.save(g);
        return ResponseEntity.ok().body("Se agrego la entrada Gps correctamente");
    }
    private Boolean chequearDatos(GpsRequest gps) {
        //Me queda chequear que latitud y longitud este entre los datos correctos
        return (gps.latitud() != null &&
                gps.longitud() != null&&
                gps.velocidad() != null&&
                gps.sentido() != null);
    }
}
