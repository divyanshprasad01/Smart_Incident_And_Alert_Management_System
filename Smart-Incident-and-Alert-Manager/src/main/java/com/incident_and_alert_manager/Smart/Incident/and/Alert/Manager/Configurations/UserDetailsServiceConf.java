package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.Configurations;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.UserRepository;
import org.jspecify.annotations.NullMarked;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//This is mandatory class implementation required by spring security it is required for fetching user data from anywhere,
//It gives us the flexibility if we want to fetch it from db or some other microservice or provider.

@NullMarked
@Service
public class UserDetailsServiceConf implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }
}
