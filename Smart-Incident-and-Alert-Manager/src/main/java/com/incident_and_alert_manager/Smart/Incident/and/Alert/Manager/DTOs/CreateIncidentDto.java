package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateIncidentDto {
    @NotBlank
    private String subject;
    @NotBlank
    private String description;
    @NotNull
    private IncidentSeverity severity;
    @NotNull
    private Long userId;

}
