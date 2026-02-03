package com.CTA.UNLP.demo.repository.Bateria;

import com.CTA.UNLP.demo.modelo.Bateria.MagnitudFisica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MagnitudFisicaRepository extends JpaRepository<MagnitudFisica,Long> {
    public List<MagnitudFisica> findByBateriaId(Long idBateria);
}
