package com.CTA.UNLP.demo.modelo.Bateria;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class TipoMagnitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //Esto tiene que ser único
    @Column(unique = true,nullable = false)
    private String tipo;
}
