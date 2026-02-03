package com.CTA.UNLP.demo.modelo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Token {
    public enum TokenType{
        BEARER,
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String token;
    @Enumerated(EnumType.STRING)
    public TokenType tokenType = TokenType.BEARER;
    public boolean revoked;
    public boolean expired;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    public Usuario usuario;
}
