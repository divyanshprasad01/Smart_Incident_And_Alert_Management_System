package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentSeverity;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.IncidentStatus;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class IncidentResponseDto {
    private Long id;
    private String subject;
    private String description;
    private IncidentSeverity severity;
    private IncidentStatus status;
    private Long userId;
    private LocalDateTime creationDateTime;
    private LocalDateTime lastUpdatedDateTime;

    public Long getUserId(User user){
        return user.getId();
    }
    public void setUserId(User userId) {
        this.userId = userId.getId();
    }
}
