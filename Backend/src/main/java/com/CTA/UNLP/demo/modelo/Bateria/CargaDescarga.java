package com.CTA.UNLP.demo.modelo.Bateria;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class CargaDescarga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fechaEntrada;
    private Date fechaInicioDescarga;
    private Date fechaFinDescarga;
    private Double descarga;
    private Date fechaInicioCarga;
    private Date fechaFinCarga;
    private Double carga;
    private Double diferenciaDesarga;
    private Double diferenciaCarga;
    @ManyToOne(fetch = FetchType.LAZY)
    private Bateria bateria;
}
