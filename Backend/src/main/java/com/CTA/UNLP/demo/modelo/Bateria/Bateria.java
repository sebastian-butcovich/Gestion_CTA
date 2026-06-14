package com.CTA.UNLP.demo.modelo.Bateria;

import com.CTA.UNLP.demo.modelo.Partes.Partes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Bateria extends Partes {
    private int numero_celdas;
    @OneToMany(mappedBy = "bateria", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<MagnitudFisica> magnitudes;
}
