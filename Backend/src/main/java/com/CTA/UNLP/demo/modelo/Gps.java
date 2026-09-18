package com.CTA.UNLP.demo.modelo;

import jakarta.persistence.*;
import jdk.jfr.Registered;
import lombok.Data;

import java.util.Date;

@Entity(name="gps")
@Data
@Registered
public class Gps {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date fecha;
    private Double latitud;
    private Double longitud;
    private Double velocidad;
    private Double sentido;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Vehiculo vehiculo;
}
