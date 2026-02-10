package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

// JPA Repository to run quires in database using Hibernate.
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
