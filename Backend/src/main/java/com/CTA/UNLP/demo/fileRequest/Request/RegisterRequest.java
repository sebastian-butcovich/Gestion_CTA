package com.CTA.UNLP.demo.fileRequest.Request;

import com.CTA.UNLP.demo.modelo.Telefono;
import com.CTA.UNLP.demo.modelo.Ubicacion;
import com.CTA.UNLP.demo.modelo.Usuario;

import java.util.List;

public record RegisterRequest(String nombre, String apellido, String nombre_usuario, String email, Usuario.Roles rol, String contrasenia,
                              Ubicacion ubicacion, List<Telefono> telefonos) {
}
