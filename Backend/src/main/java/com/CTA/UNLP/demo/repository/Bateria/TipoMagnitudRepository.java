package com.CTA.UNLP.demo.repository.Bateria;

import com.CTA.UNLP.demo.modelo.Bateria.TipoMagnitud;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoMagnitudRepository extends JpaRepository<TipoMagnitud,Long> {
    public Optional<TipoMagnitud> findByTipo(String tipo);
}

