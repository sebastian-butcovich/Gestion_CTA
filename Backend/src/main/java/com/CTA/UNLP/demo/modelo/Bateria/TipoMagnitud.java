package com.CTA.UNLP.demo.modelo.Bateria;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class TipoMagnitud {
    public enum Tipo{
        CORRIENTE,
        TENSION,
        TEMPERATURA,
        CARGA
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Tipo tipo;
}
