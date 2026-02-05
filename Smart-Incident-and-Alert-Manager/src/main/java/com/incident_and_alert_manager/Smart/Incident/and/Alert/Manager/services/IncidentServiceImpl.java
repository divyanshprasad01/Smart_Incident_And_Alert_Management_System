package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.IncidentRepository;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentServiceImpl implements IncidentService{

    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;
    private final EventsService eventsService;

    public IncidentServiceImpl(IncidentRepository incidentRepository, UserRepository userRepository, EventsService eventsService) {
        this.incidentRepository = incidentRepository;
        this.userRepository = userRepository;
        this.eventsService = eventsService;
    }

    @Override
    public Incident createIncident(String subject, String description, IncidentSeverity incidentSeverity,
                                    Long userId) throws Exception{
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found!!!"));

        Incident incident = new Incident();
        incident.setCreatedBy(user);
        incident.setSubject(subject);
        incident.setDescription(description);
        incident.setSeverity(incidentSeverity);
        incident.setIncidentStatus(IncidentStatus.Created);

        Incident createdIncident = incidentRepository.save(incident);
        eventsService.createEvent(createdIncident, "Incident Created.",
                createdIncident.getIncidentStatus());

        return createdIncident;
    }

    @Override
    public Incident getIncidentById(Long incidentId) {
        Incident incident = incidentRepository.findById(incidentId)
                                    .orElseThrow(() -> new RuntimeException("No incident found with this ID!!!"));
        return incident;
    }

    @Override
    public List<Incident> getIncidentsByUser(User user) {
        List<Incident> incidentsByUser = incidentRepository.findByCreatedBy(user);
        return incidentsByUser;
    }

    @Override
    public List<Incident> getAllIncidents() {
        List<Incident> allIncidents = incidentRepository.findAll();
        return allIncidents;
    }

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
