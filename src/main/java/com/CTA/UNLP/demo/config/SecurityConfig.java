package com.CTA.UNLP.demo.config;

import com.CTA.UNLP.demo.modelo.Token;
import com.CTA.UNLP.demo.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final TokenRepository tokenRepository;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                // ... other configurations like csrf().disable() for APIs
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**").permitAll()// Public endpoints
                        .requestMatchers("/bateria/**").permitAll()// Se asumen que son todas peticiones de vehículos o programas automáticos sin error o malicia humana
                        .anyRequest().authenticated()               // All other requests require authentication
                ).sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout->logout.logoutUrl("/auth/logout").addLogoutHandler((request,response,authentication)->{
                    final var authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                    logout(authHeader);
                }).logoutSuccessHandler((request,response,authentication)->
                        SecurityContextHolder.clearContext())
                );
        // ... build the http object
        return http.build();
    }
    private void logout(final String token){
        if(token == null || !token.startsWith("Bearer ")){
            throw new IllegalArgumentException("Invalid token");
        }
        final String jwtToken = token.substring(7);
        final Token foundToken = tokenRepository.findByToken(jwtToken).orElseThrow(
                ()-> new IllegalArgumentException("Invalid token")
        );
        foundToken.setExpired(true);
        foundToken.setRevoked(true);
        tokenRepository.save(foundToken);
    }
}