package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Event;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.IncidentRepository;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentServiceImpl implements IncidentService{

    //Initializing repositories.
    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;

    //Using separate service for events no need to initialize
    // its repo in incident service events service will handle this.
    private final EventsService eventsService;

    //Constructor for Spring boot Injection
    public IncidentServiceImpl(IncidentRepository incidentRepository, UserRepository userRepository, EventsService eventsService) {
        this.incidentRepository = incidentRepository;
        this.userRepository = userRepository;
        this.eventsService = eventsService;
    }

//  Takes all the raw data and sets it in incident entity and saves it in db.
    @Override
    public Incident createIncident(String subject, String description, IncidentSeverity incidentSeverity,
                                    Long userId) throws Exception{
//      Gets the user by whom incident is created from passed userId it should be
//      handled by userService will change it later.
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found!!!"));

//      Creates an Incident object using provided data and saves it in Incident database.
        Incident incident = new Incident();
        incident.setCreatedBy(user);
        incident.setSubject(subject);
        incident.setDescription(description);
        incident.setSeverity(incidentSeverity);
        incident.setIncidentStatus(IncidentStatus.Created);

//      To return the Incident Object.
        Incident createdIncident = incidentRepository.save(incident);
        eventsService.createEvent(createdIncident, "Incident Created.",
                createdIncident.getIncidentStatus());

        return createdIncident;
    }

//  Takes an Incident id and returns an Incident object after fetching it from db.
    @Override
    public Incident getIncidentById(Long incidentId) {
        Incident incident = incidentRepository.findById(incidentId)
                                    .orElseThrow(() -> new RuntimeException("No incident found with this ID!!!"));
        return incident;
    }

//  Fetches a list of all incidents created by a user.
    @Override
    public List<Incident> getIncidentsByUser(User user) {
        List<Incident> incidentsByUser = incidentRepository.findByCreatedBy(user);
        return incidentsByUser;
    }

//   Fetches a list of all incidents from database.
    @Override
    public List<Incident> getAllIncidents() {
        List<Incident> allIncidents = incidentRepository.findAll();
        return allIncidents;
    }

//  Fetches a list of all events of an incident from events table, handled by events service.
    @Override
    public List<Event> getAllEventsOfIncident(Incident incident){
        List<Event> allEventsOfIncident = eventsService.getEventsByIncident(incident);
        return allEventsOfIncident;
    }


//  Below are the methods to set different status of an Incident each status takes a message to store.
    @Override
    public Incident acknowledgeIncident(Incident incident, String actionDescription) throws Exception{
        if(!incident.getIncidentStatus().equals(IncidentStatus.Created)){
            throw new Exception("Incident Not Created!!!");
        }
        eventsService.createEvent(incident, actionDescription, IncidentStatus.Acknowledged);
        incident.setIncidentStatus(IncidentStatus.Acknowledged);
        return incidentRepository.save(incident);
    }

    @Override
    public Incident inProgressIncident(Incident incident, String actionDescription) throws Exception{
        eventsService.createEvent(incident, actionDescription, IncidentStatus.In_Progress);
        incident.setIncidentStatus(IncidentStatus.In_Progress);
        return incidentRepository.save(incident);
    }

    @Override
    public Incident resolvedIncident(Incident incident, String actionDescription) throws Exception{
        eventsService.createEvent(incident, actionDescription, IncidentStatus.Resolved);
        incident.setIncidentStatus(IncidentStatus.Resolved);
        return incidentRepository.save(incident);
    }

    @Override
    public Incident closedIncident(Incident incident, String actionDescription) throws Exception{
        eventsService.createEvent(incident, actionDescription, IncidentStatus.Closed);
        incident.setIncidentStatus(IncidentStatus.Closed);
        return incidentRepository.save(incident);
    }


}
