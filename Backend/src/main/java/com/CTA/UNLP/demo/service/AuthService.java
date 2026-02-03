package com.CTA.UNLP.demo.service;

import com.CTA.UNLP.demo.fileRequest.Request.LoginRequest;
import com.CTA.UNLP.demo.fileRequest.Response.TokenResponse;
import com.CTA.UNLP.demo.modelo.Token;
import com.CTA.UNLP.demo.modelo.Usuario;
import com.CTA.UNLP.demo.repository.TokenRepository;
import com.CTA.UNLP.demo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.CTA.UNLP.demo.fileRequest.Request.RegisterRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final  JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public TokenResponse register(RegisterRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre());
        usuario.setApellido(request.apellido());
        usuario.setNombre_usuario(request.nombre_usuario());
        usuario.setContrasenia(passwordEncoder.encode(request.contrasenia()));
        usuario.setRol(request.rol());
        usuario.setEmail(request.email());
        usuario.setUbicacion(request.ubicacion());
        usuario.setTelefonos(request.telefonos());
        Usuario guardarUsuario = usuarioRepository.save(usuario);
        String jwtToken = jwtService.generateToken(usuario);
        String refreshToken = jwtService.generateRefreshToken(guardarUsuario);
        saveUserToken(usuario,jwtToken);
        return new TokenResponse(jwtToken,refreshToken);
    }

    public TokenResponse login(LoginRequest request) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.contrasenia()
                )
        );
        Usuario usuario = usuarioRepository.findByEmail(request.email()).get();
        String jwtToken = jwtService.generateToken(usuario);
        String refreshToken = jwtService.generateRefreshToken(usuario);
        revokeAllUserToken(usuario);
        saveUserToken(usuario,jwtToken);
        return new TokenResponse(jwtToken,refreshToken);
    }
    private void revokeAllUserToken(final Usuario usuario){
        final List<Token> validUserToken = tokenRepository.findAllValidIsFalseOrRevokedIsFalseByUsuarioId(usuario.getId());
        if(!validUserToken.isEmpty()){
            for(final Token token: validUserToken){
                token.setExpired(true);
                token.setRevoked(true);
            }
        }
    }
    public TokenResponse refreshToken(String authHeader) {
       if(authHeader == null || !authHeader.startsWith("Bearer")){
           throw new IllegalArgumentException("Invalid Bearer Token");
       }
       final String refreshToken = authHeader.substring(7);
       final String useremail = jwtService.extractEmail(refreshToken);
       if (useremail == null){
           throw new IllegalArgumentException("Invalid Refresh Token");
       }
       final Usuario usuario = usuarioRepository.findByEmail(useremail).orElseThrow(
               ()-> new UsernameNotFoundException(useremail)
       );
       if(!jwtService.isTokenValid(refreshToken,usuario)){
            throw new IllegalArgumentException("Invalid Refresh Token");
       }
       final String accessToken = jwtService.generateToken(usuario);
        revokeAllUserToken(usuario);
        saveUserToken(usuario,accessToken);
       return new TokenResponse(accessToken,refreshToken);
    }
    public void saveUserToken(Usuario usuario, String jwtToken){
        Token token = new Token();
        token.setToken(jwtToken);
        token.setTokenType(Token.TokenType.BEARER);
        token.setExpired(false);
        token.setRevoked(false);
        token.setUsuario(usuario);
        tokenRepository.save(token);
    }
}
