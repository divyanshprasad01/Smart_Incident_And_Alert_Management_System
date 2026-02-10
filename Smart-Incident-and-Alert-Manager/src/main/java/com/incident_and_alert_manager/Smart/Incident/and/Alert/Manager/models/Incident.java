package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

//Incident entity or model, it is based on dbColumn incident
@Entity
@Table(name = "incident")
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at" ,nullable = false, updatable = false, insertable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "subject" ,nullable = false)
    private String subject;

    @Column(name = "description" ,nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "severity" ,nullable = false)
    private IncidentSeverity severity;

    @Enumerated(EnumType.STRING)
    @Column(name = "incident_status" ,nullable = false)
    private IncidentStatus incidentStatus;

//  Many to one annotation defines that it is a foreign key with
//  relation to the table User and one user can create many incidents.
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

//  Update timestamp defines that it is auto generated and auto updated,
//  we cannot use Generated value annotation here as it is only for primary keys.
    @Column(name = "updated_at", nullable = false, updatable = false, insertable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;


//  As I have not annotated this class with lombok getter and setter
//  I have generated all getter and setter with the help of IDE, I don't want to touch it now at this stage.

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public IncidentSeverity getSeverity() {
        return severity;
    }

    public void setSeverity(IncidentSeverity severity) {
        this.severity = severity;
    }

    public IncidentStatus getIncidentStatus() {
        return incidentStatus;
    }

    public void setIncidentStatus(IncidentStatus incidentStatus) {
        this.incidentStatus = incidentStatus;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
