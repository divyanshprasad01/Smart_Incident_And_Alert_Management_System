package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.incident_status;
import jakarta.persistence.*;

@Entity
@Table(name = "events")
public class events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    @ManyToOne
    @JoinColumn(name = "incident_id")
    private incident incidentId;

    @Column(nullable = false)
    private String action;

    @Column
    @Enumerated(EnumType.STRING)
    private incident_status incidentStatus;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public incident getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(incident incidentId) {
        this.incidentId = incidentId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public incident_status getIncidentStatus() {
        return incidentStatus;
    }

    public void setIncidentStatus(incident_status incidentStatus) {
        this.incidentStatus = incidentStatus;
    }
}
