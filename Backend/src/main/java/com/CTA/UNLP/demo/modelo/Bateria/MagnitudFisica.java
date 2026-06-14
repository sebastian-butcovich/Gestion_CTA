package com.CTA.UNLP.demo.modelo.Bateria;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public  class MagnitudFisica {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date fecha;
    private double valor;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private TipoMagnitud magnitud;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "bateria_id")
    private Bateria bateria;
}
