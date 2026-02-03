package com.CTA.UNLP.demo.controller.Bateria;

import com.CTA.UNLP.demo.service.Bateria.BateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bateria")
@RequiredArgsConstructor
public class BateriaController {
    private final BateriaService bateriaService;

}
