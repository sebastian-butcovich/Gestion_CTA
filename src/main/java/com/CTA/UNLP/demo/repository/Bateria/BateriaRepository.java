package com.CTA.UNLP.demo.repository.Bateria;

import com.CTA.UNLP.demo.modelo.Bateria.Bateria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BateriaRepository extends JpaRepository<Bateria,Long> {
    public Optional<Bateria> findById(Long id);

    Long id(Long id);
}
