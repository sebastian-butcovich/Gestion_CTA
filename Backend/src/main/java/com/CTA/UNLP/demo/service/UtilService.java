package com.CTA.UNLP.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UtilService {
    public ResponseEntity<Integer> isAlive(){
        return ResponseEntity.ok().body(1);
    }
}
