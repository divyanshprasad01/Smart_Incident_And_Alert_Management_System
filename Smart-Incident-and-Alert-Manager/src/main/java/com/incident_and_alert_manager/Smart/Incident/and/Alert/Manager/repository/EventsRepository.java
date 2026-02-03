package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Events;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventsRepository extends JpaRepository<Events, Long> {

    List<Events> findByIncidentId(Long incidentId);
}
