package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResolvedIncidentDto {
    @NotBlank
    private String message;
}
