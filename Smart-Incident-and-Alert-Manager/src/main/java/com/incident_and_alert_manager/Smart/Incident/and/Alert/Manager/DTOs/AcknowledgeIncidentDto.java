package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcknowledgeIncidentDto {
    @NotNull
    private String message;
}
