package com.CTA.UNLP.demo.service.vehiculos;

import com.CTA.UNLP.demo.modelo.Bateria.Bateria;
import com.CTA.UNLP.demo.modelo.Partes.Partes;
import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.repository.VehiculoRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class VehiculoService {
    @Autowired
    private   VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerTodosLosVehiculos(){
        List<Vehiculo> vehiculos = this.vehiculoRepository.findAll();
        return vehiculos;
    }
    public ResponseEntity<Vehiculo> obtenerVehiculoPorId(Integer id){
        Optional<Vehiculo> vehiculo = this.vehiculoRepository.findById(id);
        if(vehiculo.isPresent()){
            return  new ResponseEntity<Vehiculo>(vehiculo.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<Vehiculo>(HttpStatus.NOT_FOUND);
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
}
