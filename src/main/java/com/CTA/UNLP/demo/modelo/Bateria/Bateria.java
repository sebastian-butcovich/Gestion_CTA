package com.CTA.UNLP.demo.modelo.Bateria;

import com.CTA.UNLP.demo.modelo.Partes;
import com.CTA.UNLP.demo.modelo.Vehiculo;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Bateria extends Partes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany
    private List<Temperatura> temperatura;
    @OneToMany
    private List<Corriente> corrientes;
    @OneToMany
    private List<Tension> tension;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Vehiculo vehiculo;
    private int numero_celdas;
}
