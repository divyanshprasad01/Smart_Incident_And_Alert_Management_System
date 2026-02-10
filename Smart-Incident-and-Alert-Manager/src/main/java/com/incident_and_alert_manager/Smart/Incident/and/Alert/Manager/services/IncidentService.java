package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Event;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;

import java.util.List;

//The main interface.
//The main logic and main service of this application
public interface IncidentService {

    Incident createIncident(String subject,
                            String description,
                            IncidentSeverity incidentSeverity,
                            Long userId) throws Exception;

    Incident getIncidentById(Long incidentId);

//  Need to implement logic of this method.
    List<Incident> getIncidentsByUser(User userId);
    List<Incident> getAllIncidents();
    List<Event> getAllEventsOfIncident(Incident incident);

//   Different methods for different status gives us the ability to enforce a lifecycle of an incident
//   for example no one can go back from inProgress to acknowledge status, we can do this in one method too,
//   but it would give extra traffic on database at it will fetch status from database for every check.
    Incident acknowledgeIncident(Incident incident, String actionDescription) throws Exception;
    Incident inProgressIncident(Incident incident, String actionDescription) throws Exception;
    Incident resolvedIncident(Incident incident, String actionDescription) throws Exception;
    Incident closedIncident(Incident incident, String actionDescription) throws Exception;
}
