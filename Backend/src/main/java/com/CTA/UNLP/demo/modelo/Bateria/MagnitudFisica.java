package com.CTA.UNLP.demo.modelo.Bateria;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public  class MagnitudFisica {
    public enum Tipo{
        CORRIENTE,
        TENSION,
        TEMPERATURA,
        CARGA
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date fecha;
    private double valor;
    private Tipo magnitud;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Bateria bateria;
}
