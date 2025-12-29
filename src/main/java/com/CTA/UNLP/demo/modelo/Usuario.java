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

//    public Usuario(List<Token> tokens, Ubicacion ubicacion, List<Telefono> telefonos, String email, String contrasenia, Roles rol, String nombre_usuario, String apellido, String nombre, Long id) {
//        this.tokens = tokens;
//        this.ubicacion = ubicacion;
//        this.telefonos = telefonos;
//        this.email = email;
//        this.contrasenia = contrasenia;
//        this.rol = rol;
//        this.nombre_usuario = nombre_usuario;
//        this.apellido = apellido;
//        this.nombre = nombre;
//        this.id = id;
//    }

    public Usuario() {
    }
}
