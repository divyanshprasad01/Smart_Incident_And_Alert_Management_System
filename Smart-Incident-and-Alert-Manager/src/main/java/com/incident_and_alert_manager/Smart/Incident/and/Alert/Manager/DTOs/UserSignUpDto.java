package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.UserRoles;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpDto {

    private String email;
    private String password;
    private String name;
    private UserRoles userRole;


}
