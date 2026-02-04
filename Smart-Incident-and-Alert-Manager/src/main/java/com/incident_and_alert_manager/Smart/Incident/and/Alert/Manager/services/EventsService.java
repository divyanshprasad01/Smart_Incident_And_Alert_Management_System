package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Event;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;

import java.util.List;

public interface EventsService {

    Event createEvent(Incident incident, String actionDescription, IncidentStatus incidentStatus) throws Exception;

    List<Event> getEventsByIncident(Incident incident);

}
