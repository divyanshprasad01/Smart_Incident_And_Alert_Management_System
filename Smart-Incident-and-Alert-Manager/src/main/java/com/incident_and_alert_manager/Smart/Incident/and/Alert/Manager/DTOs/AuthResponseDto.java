package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDto {
    private String token;
    public AuthResponseDto(String token) {
        this.token = token;
    }

}
