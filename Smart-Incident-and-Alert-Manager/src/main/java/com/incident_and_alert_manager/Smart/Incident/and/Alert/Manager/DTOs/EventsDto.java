package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.processing.Generated;

@Getter
@Setter
public class EventsDto {
    private Long id;
    private String message;
    private IncidentStatus incidentStatus;
}
