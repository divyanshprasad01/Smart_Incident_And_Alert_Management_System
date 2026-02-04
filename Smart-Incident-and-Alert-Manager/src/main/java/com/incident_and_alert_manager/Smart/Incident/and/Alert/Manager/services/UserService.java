package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;


import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;

public interface UserService {

    User getUserByID(Long id);
    User getUserByEmail(String email);
    User createUser(User user);



}
