package com.CTA.UNLP.demo.modelo.Partes;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Inheritance(strategy =InheritanceType.TABLE_PER_CLASS)
public abstract class Partes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Estado_Partes> estados;

}
