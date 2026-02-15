package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.controllers;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.Components.JwtUtil;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.AuthResponseDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.UserDetailsDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.UserLoginDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.UserSignUpDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


//Endpoint for authentication of a user using spring security
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

//  Constructor for injecting beans.
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

//  This just takes a User Signup form and passes it to create user method in userService to save a new user in db.
    @PostMapping("/signup")
    public UserDetailsDto signup(@RequestBody UserSignUpDto userSignUpDto) {
        User user = userService.createUser(userSignUpDto.getName(),
                userSignUpDto.getEmail(),
                userSignUpDto.getPassword(),
                userSignUpDto.getUserRole());

        return mapUserDetails(user);
    }

//  It uses basic email password login method and then generates a jwt token which is valid for  2 hour and gives it to user.
    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody UserLoginDto userLoginDto) {
        Authentication authentication =  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwtToken = jwtUtil.generateJwtToken(userDetails);
        return new AuthResponseDto(jwtToken);
    }


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
