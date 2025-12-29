package com.CTA.UNLP.demo.modelo;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Partes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String nombre;
    private double precio;
    private boolean se_tiene_que_comprar;
    private boolean urgencia;
}
