package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.EventsRepository;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.IncidentRepository;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentServiceImpl implements IncidentService{

    private final IncidentRepository incidentRepository;
    private final EventsRepository eventsRepository;
    private final UserRepository userRepository;

    public IncidentServiceImpl(IncidentRepository incidentRepository, EventsRepository eventsRepository, UserRepository userRepository) {
        this.incidentRepository = incidentRepository;
        this.eventsRepository = eventsRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Incident createIncident(String subject, String description, IncidentSeverity incidentSeverity, IncidentStatus incidentStatus, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found!!!"));

        Incident incident = new Incident();
        incident.setCreatedBy(user);
        incident.setSubject(subject);
        incident.setDescription(description);
        incident.setSeverity(incidentSeverity);
        incident.setIncidentStatus(incidentStatus);

        Incident createdIncident = incidentRepository.save(incident);

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
}
