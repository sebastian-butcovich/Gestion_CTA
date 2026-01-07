package com.CTA.UNLP.demo.modelo.Bateria;

import com.CTA.UNLP.demo.modelo.Partes.Partes;
import com.CTA.UNLP.demo.modelo.Vehiculo;
import com.CTA.UNLP.demo.service.Bateria.MagnitudFisicaService;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Bateria extends Partes {
    private int numero_celdas;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MagnitudFisica> magnitudes;
}
