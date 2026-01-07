package com.CTA.UNLP.demo.modelo;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Entity
@Data

public class Usuario {
    public enum Roles{
        ADMINISTRADOR,
        USUARIO_CTA,
        USUARIO_CLIENTE,
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    private String apellido;
    private String nombre_usuario;
    private Roles rol;
    private String contrasenia;
    @Column(unique = true)
    private String email;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Telefono> telefonos;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Ubicacion ubicacion;
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    private List<Token> tokens;

    public Usuario() {
    }
}
