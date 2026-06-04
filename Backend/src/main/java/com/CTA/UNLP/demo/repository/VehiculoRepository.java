package com.CTA.UNLP.demo.repository;

import com.CTA.UNLP.demo.modelo.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo,Long> {
    public Optional<Vehiculo> findById(Integer id);
}
