package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.incident_severity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.incident_status;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "incident")
public class incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private incident_severity severity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private incident_status incidentStatus;


    @ManyToOne
    @JoinColumn(name = "created_by")
    private user createdBy;

    @Column(name = "updated_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime updatedAt;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public incident_severity getSeverity() {
        return severity;
    }

    public void setSeverity(incident_severity severity) {
        this.severity = severity;
    }

    public incident_status getIncidentStatus() {
        return incidentStatus;
    }

    public void setIncidentStatus(incident_status incidentStatus) {
        this.incidentStatus = incidentStatus;
    }

    public user getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(user createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
