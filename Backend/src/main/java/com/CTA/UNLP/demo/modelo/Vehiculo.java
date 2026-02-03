package com.CTA.UNLP.demo.modelo;

import com.CTA.UNLP.demo.modelo.Partes.Partes;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Ubicacion ubicacion;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Partes> partes;
}
