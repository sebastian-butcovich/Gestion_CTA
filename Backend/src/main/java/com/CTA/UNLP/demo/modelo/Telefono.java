package com.CTA.UNLP.demo.modelo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Telefono {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String numero;
}
