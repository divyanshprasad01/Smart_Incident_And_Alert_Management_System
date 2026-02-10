package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Event;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// JPA Repository to run quires in database using Hibernate.
public interface EventsRepository extends JpaRepository<Event, Long> {

    List<Event> findByIncidentId(Incident incident);
}
