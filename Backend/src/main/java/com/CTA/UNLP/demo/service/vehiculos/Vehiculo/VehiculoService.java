package com.CTA.UNLP.demo.service.vehiculos.Vehiculo;

import com.CTA.UNLP.demo.fileRequest.Response.Vehiculo.VehiculoResponse;
import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.repository.Vehiculo.VehiculoRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class VehiculoService {
    @Autowired
    private   VehiculoRepository vehiculoRepository;

    public List<VehiculoResponse> obtenerTodosLosVehiculos(){
        List<Vehiculo> vehiculos = this.vehiculoRepository.findAll();
        List<VehiculoResponse> vehiculosResponse = new ArrayList<>();
        for(Vehiculo vehiculo : vehiculos){
            vehiculosResponse.add(new VehiculoResponse(vehiculo.getId(),vehiculo.getNombre(),vehiculo.getBateria(),vehiculo.getUbicacion()));
        }
        return vehiculosResponse;
    }
    public ResponseEntity<VehiculoResponse> obtenerVehiculoPorId(Integer id){
        Optional<Vehiculo> vehiculo = this.vehiculoRepository.findById(id);
        if(vehiculo.isPresent()){
            return  new ResponseEntity<VehiculoResponse>(new VehiculoResponse(vehiculo.get().getId(),vehiculo.get().getNombre(),vehiculo.get().getBateria(),vehiculo.get().getUbicacion()
            ), HttpStatus.OK);
        }else{
            return new ResponseEntity<VehiculoResponse>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<String> modificarVehiculo( Vehiculo vehiculo){
        //Busco el vehículo en la base de datos
        Optional<Vehiculo> vehiculo1 = this.vehiculoRepository.findById(vehiculo.getId());
        if(!vehiculo1.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        //Creo otra variable para manipular más fácil las operaciones
        Vehiculo vehiculo2 = vehiculo1.get();
        //Sobreescribo los datos anteriores
        vehiculo2.setNombre(vehiculo.getNombre());
        vehiculo2.getBateria().setNombre(vehiculo.getBateria().getNombre());
        vehiculo2.getBateria().setNumero_celdas(vehiculo.getBateria().getNumero_celdas());
        vehiculo2.setUbicacion(vehiculo.getUbicacion());
        //Actualizo
        vehiculoRepository.save(vehiculo2);
        //Devuelvo una respuesta
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    public ResponseEntity<String> eliminarVehiculo(Integer id){
        //Busco el vehículo.
        Optional<Vehiculo> vehiculo = this.vehiculoRepository.findById(id);
        //Pregunto si se encontro el vehículo.
        if(vehiculo.isPresent()){
            vehiculoRepository.delete(vehiculo.get());
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
