package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;

import java.util.List;

public interface IncidentService {

    Incident createIncident(String subject,
                            String description,
                            IncidentSeverity incidentSeverity,
                            IncidentStatus incidentStatus,
                            Long userId);

    Incident getIncidentById(Long incidentId);
    List<Incident> getIncidentsByUser(User userId);
    List<Incident> getAllIncidents();
}
