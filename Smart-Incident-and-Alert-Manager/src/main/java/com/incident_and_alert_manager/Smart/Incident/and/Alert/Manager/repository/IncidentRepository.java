package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByIncidentStatus(IncidentStatus incidentStatus);
    List<Incident> findBySeverity(IncidentSeverity severity);
    List<Incident> findByCreatedBy(User user);

}
