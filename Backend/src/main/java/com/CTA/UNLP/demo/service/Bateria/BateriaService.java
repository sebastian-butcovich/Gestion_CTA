package com.CTA.UNLP.demo.service.Bateria;

import com.CTA.UNLP.demo.repository.Bateria.BateriaRepository;
import com.CTA.UNLP.demo.repository.VehiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BateriaService {
    private final BateriaRepository bateriaRepository;
    private final VehiculoRepository vehiculoRepository;

}
