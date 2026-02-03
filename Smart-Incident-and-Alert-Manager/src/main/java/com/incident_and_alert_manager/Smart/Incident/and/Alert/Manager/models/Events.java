package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "Events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "incident_id")
    private Incident incidentId;

    @Column(nullable = false)
    private String action;

    @Column
    @Enumerated(EnumType.STRING)
    private IncidentStatus incidentStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Incident getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(Incident incidentId) {
        this.incidentId = incidentId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public IncidentStatus getIncidentStatus() {
        return incidentStatus;
    }

    public void setIncidentStatus(IncidentStatus incidentStatus) {
        this.incidentStatus = incidentStatus;
    }
}
