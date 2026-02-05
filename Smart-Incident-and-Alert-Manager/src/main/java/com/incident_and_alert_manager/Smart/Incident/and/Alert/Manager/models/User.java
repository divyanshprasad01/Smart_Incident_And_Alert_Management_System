package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.UserRoles;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name" ,nullable = false)
    private String name;

    @Column(name = "user_email" ,nullable = false)
    private String email;

    @Column(name = "user_password" ,nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role" ,nullable = false)
    private UserRoles userRole;

    @Column(name = "user_created_at" , nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRoles getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRoles userRole) {
        this.userRole = userRole;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
