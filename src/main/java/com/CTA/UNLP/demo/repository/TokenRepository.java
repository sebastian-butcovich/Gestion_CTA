package com.CTA.UNLP.demo.repository;

import com.CTA.UNLP.demo.modelo.Token;
import com.CTA.UNLP.demo.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token,Long> {
    public List<Token> findAllValidIsFalseOrRevokedIsFalseByUsuarioId(Long id);
    public Optional<Token> findByToken(String token);
}
