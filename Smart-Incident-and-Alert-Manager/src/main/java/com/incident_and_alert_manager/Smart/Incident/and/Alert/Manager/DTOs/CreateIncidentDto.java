package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateIncidentDto {
    private String subject;
    private String description;
    private IncidentSeverity severity;
    private Long userId;

}
