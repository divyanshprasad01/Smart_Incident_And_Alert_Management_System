package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.controllers;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.UserDetailsDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.UserLoginDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.UserSignUpDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/signup")
    public UserDetailsDto signup(@RequestBody UserSignUpDto userSignUpDto) {
        User user = userService.createUser(userSignUpDto.getName(),
                userSignUpDto.getEmail(),
                userSignUpDto.getPassword(),
                userSignUpDto.getUserRole());

        return mapUserDetails(user);
    }
//
//    @PostMapping("/login")
//    public UserDetailsDto login(@RequestBody UserLoginDto userLoginDto) {
//        User user = userService.authenticateUser(userLoginDto.getEmail(), userLoginDto.getPassword());
//        return mapUserDetails(user);
//    }
//

    private UserDetailsDto mapUserDetails(User user) {
        UserDetailsDto userDetailsDto = new UserDetailsDto();
        userDetailsDto.setEmail(user.getEmail());
        userDetailsDto.setName(user.getName());
        userDetailsDto.setUserRole(user.getUserRole());
        userDetailsDto.setId(user.getId());
        userDetailsDto.setAccountLocked(user.getIsAccountLocked());
        return userDetailsDto;
    }

}
