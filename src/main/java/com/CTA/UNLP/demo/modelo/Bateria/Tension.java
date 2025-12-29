package com.CTA.UNLP.demo.modelo.Bateria;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Tension extends MagnitudFisica {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private Bateria bateria;
    public Tension(Long id, double tension,Bateria bateria) {
        this.setValor(tension);
        this.setBateria(bateria);
    }

    public Tension() {

    }
}
