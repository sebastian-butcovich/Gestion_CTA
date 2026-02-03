package com.CTA.UNLP.demo.modelo.Administracion;

import com.CTA.UNLP.demo.modelo.Usuario;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@Data
public class Objeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private int cantidad;
    private Double precio;
    private Date fecha_de_entrada;

}
