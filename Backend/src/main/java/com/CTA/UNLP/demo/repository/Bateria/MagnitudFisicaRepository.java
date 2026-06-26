package com.CTA.UNLP.demo.repository.Bateria;

import com.CTA.UNLP.demo.modelo.Bateria.MagnitudFisica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MagnitudFisicaRepository extends JpaRepository<MagnitudFisica,Long> {
    public List<MagnitudFisica> findByBateriaId(Long idBateria);
    @Query("SELECT m FROM MagnitudFisica m where m.bateria.id=:id and m.fecha between :fecha1 and :fecha2")
    public List<MagnitudFisica> findByFecha(@Param("id")Long id, @Param("fecha1") LocalDateTime fecha1, @Param("fecha2")LocalDateTime fecha2);
}