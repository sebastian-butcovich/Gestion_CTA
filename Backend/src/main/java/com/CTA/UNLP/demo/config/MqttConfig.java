package com.CTA.UNLP.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
@Configuration
public class MqttConfig {
    @Value("${mqtt.broker}")
    private String broker;
    @Value("${mqtt.clientId}")
    private String clienteId;

    @Bean
    public MqttConnectOptions mqttConnectionsOptions(){
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{broker});
        return options;
    }
}
