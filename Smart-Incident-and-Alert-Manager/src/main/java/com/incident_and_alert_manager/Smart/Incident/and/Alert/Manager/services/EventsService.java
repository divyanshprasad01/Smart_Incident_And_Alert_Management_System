package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Event;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;

import java.util.List;

//Interface for and event service it describes the main two methods of events it is not directly accessible
//to the user, Events only logs  the lifecycle of a incident so it is only accessible from Incident service
//no direct access to the user that's why only two methods create and get.


public interface EventsService {

    Event createEvent(Incident incident, String actionDescription, IncidentStatus incidentStatus) ;

    List<Event> getEventsByIncident(Incident incident);

}
