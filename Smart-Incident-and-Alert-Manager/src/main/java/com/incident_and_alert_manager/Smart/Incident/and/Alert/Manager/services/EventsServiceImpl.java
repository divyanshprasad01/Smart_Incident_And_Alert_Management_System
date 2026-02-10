package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Event;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.EventsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventsServiceImpl implements EventsService{
    private final EventsRepository eventsRepository;

    //Takes the repository bean for database connectivity using hibernate and JDBC.
    public EventsServiceImpl(EventsRepository eventsRepository) {
        this.eventsRepository = eventsRepository;
    }

    @Override
    public Event createEvent(Incident incident, String actionDescription, IncidentStatus incidentStatus) {
        //Initializing an event entity to pass it in database.
        Event event = new Event();
        event.setAction(actionDescription);
        event.setIncidentId(incident);
        event.setIncidentStatus(incidentStatus);

        return eventsRepository.save(event);
    }

    //Passing incident object here and not Id because I have defined Incident as foreign key in Events entity
    //It will map it automatically.
    @Override
    public List<Event> getEventsByIncident(Incident incident) {
        //Passing the foreign key incident to fetch the results from repository Hibernate will automatically handle this.
        return eventsRepository.findByIncidentId(incident);
    }
}
