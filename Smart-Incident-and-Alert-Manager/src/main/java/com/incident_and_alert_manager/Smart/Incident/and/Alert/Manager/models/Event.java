package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "events")
//Event model or entity with the table named events in db.
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "created_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime updatedAt;

//  For this field many to one as this field is a foreign key and one incident can have many entries here.
    @ManyToOne
    @JoinColumn(name = "incident_id")
    private Incident incidentId;

    @Column(name = "action_description" ,nullable = false)
    private String action;

    @Column(name = "status")
//  For this field a set of values are defined anything else is not acceptable.
    @Enumerated(EnumType.STRING)
    private IncidentStatus incidentStatus;

}
