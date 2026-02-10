package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;


import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.UserRoles;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;

//To handle all user related methods helps spring security to fetch user from db.
public interface UserService {

    User getUserByID(Long id);
    User getUserByEmail(String email);
    User createUser(String name, String email, String password, UserRoles role);

//  For authenticating users with basic email and password using spring security.
    User authenticateUser(String email, String password);

}
