package com.CTA.UNLP.demo.modelo.Bateria;

import com.CTA.UNLP.demo.modelo.Partes.Partes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Bateria extends Partes {
    private int numero_celdas;
    @OneToMany(mappedBy = "bateria", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<MagnitudFisica> magnitudes;
    @OneToMany(mappedBy = "bateria", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<CargaDescarga>  cargas;
}
