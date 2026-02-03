package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Events;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventsRepository extends JpaRepository<Events, Long> {
}
