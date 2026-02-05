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
                            Long userId) throws Exception;

    Incident getIncidentById(Long incidentId);
    List<Incident> getIncidentsByUser(User userId);
    List<Incident> getAllIncidents();

    Incident acknowledgeIncident(Incident incident, String actionDescription) throws Exception;
    Incident inProgressIncident(Incident incident, String actionDescription) throws Exception;
    Incident resolvedIncident(Incident incident, String actionDescription) throws Exception;
    Incident closedIncident(Incident incident, String actionDescription) throws Exception;
}
