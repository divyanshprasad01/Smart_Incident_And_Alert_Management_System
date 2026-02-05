package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "Event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "created_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "incident_id")
    private Incident incidentId;

    @Column(nullable = false)
    private String action;

    @Column
    @Enumerated(EnumType.STRING)
    private IncidentStatus incidentStatus;

}
