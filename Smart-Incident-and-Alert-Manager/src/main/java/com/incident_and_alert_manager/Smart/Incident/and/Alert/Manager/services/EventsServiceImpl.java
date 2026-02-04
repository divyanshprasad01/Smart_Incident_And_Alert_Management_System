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

    public EventsServiceImpl(EventsRepository eventsRepository) {
        this.eventsRepository = eventsRepository;
    }

    @Override
    public Event createEvent(Incident incident, String actionDescription, IncidentStatus incidentStatus) throws Exception {
        Event event = new Event();
        event.setAction(actionDescription);
        event.setIncidentId(incident);
        event.setIncidentStatus(incidentStatus);

        Event createdEvent = eventsRepository.save(event);
        if (createdEvent == null)
            throw new Exception("Event creation failed!!! Some Error Occurred, please check values entered.");

        return createdEvent;
    }

    @Override
    public List<Event> getEventsByIncident(Incident incident) {
        List<Event> eventsOfIncident = eventsRepository.findByIncidentId(incident.getId());

        return eventsOfIncident;
    }
}
