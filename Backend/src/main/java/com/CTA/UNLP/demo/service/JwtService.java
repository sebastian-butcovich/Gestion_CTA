package com.CTA.UNLP.demo.service;

import com.CTA.UNLP.demo.modelo.Usuario;
import com.CTA.UNLP.demo.repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {
    private TokenRepository tokenRepository;
    @Value("${jwt_secret_key}")
    private String secretKey;
    @Value("${jwt.access.token.expiration}")
    private long jwtExpiration;
    @Value("${jwt.refresh.token.expiration}")
    private long refreshExpiration;
    public String generateRefreshToken(Usuario usuario) {
        return buildToken(usuario, refreshExpiration);
    }

    public String generateToken(Usuario usuario) {
        return buildToken(usuario, jwtExpiration);
    }
    private String buildToken(final Usuario usuario, final long expiration){

        return Jwts.builder().id(usuario.getId().toString())
                .claims(Map.of("nombre",usuario.getNombre()))
                .subject(usuario.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date((System.currentTimeMillis()+expiration)))
                .signWith(getSignInKey())
                .compact();
    }
    private SecretKey getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);

    }
    public String extractEmail(final String token){
        final Claims jwtToken = Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return jwtToken.getSubject();
    }
    public boolean isTokenValid(final String token, final Usuario usuario){
        final String email = extractEmail(token);
        return email.equals(usuario.getEmail()) && !isTokenExpired(token);
    }
    private boolean isTokenExpired(final String token){
        return extracExpiration(token).before(new Date());
    }
    private Date extracExpiration(final String token){
      final Claims jwtToken = Jwts.parser()
              .verifyWith(getSignInKey())
              .build()
              .parseSignedClaims(token)
              .getPayload();
      return jwtToken.getExpiration();
    }
}
