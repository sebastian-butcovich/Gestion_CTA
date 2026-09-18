package com.CTA.UNLP.demo.controller.util;

import com.CTA.UNLP.demo.service.UtilService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/util")
@RequiredArgsConstructor
public class UtilController {
    private final UtilService utilService;
    @PostMapping("/isAlive")
    public ResponseEntity<Integer> isAlive(){
        return utilService.isAlive();
    }
}
