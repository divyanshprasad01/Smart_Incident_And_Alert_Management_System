package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.UserRoles;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.User;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


//Main user service to create, fetch, authenticate users.
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private AuthenticationManager authenticationManager;

//  password encoder so users password are saved in encrypted form in db.
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
//  Constructor for spring boot injection.
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


//   Takes user signup form data and sets it in user entity and stores it in database.
    @Override
    public User createUser(String name, String email, String password, UserRoles role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
//      encoding user password before storing in database.
        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setUserRole(role);
        user.setIsAccountLocked(false);
        user.setIsPasswordExpired(false);

        return userRepository.save(user);
    }

//  Authenticates user with basic authentication using email password which will be used later to generate JWT.
    @Override
    public User authenticateUser(String email, String password) {
            Authentication authentication = authenticationManager.authenticate(
                                            new UsernamePasswordAuthenticationToken(email, password));
            User user = new User();
            if(authentication.isAuthenticated()) {
                user = userRepository.findByEmail(email);
            }else{
                user = null;
            }
        return user;
    }


//  Below are the methods to fetch a user by id or email.
    @Override
    public User getUserByID(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
