package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.enums.UserRoles;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NullMarked
@Entity
@Table(name = "users")
public class User implements UserDetails {
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

    @Column(name = "is_password_expired", nullable = false)
    private Boolean isPasswordExpired;

    @Column(name = "is_account_locked", nullable = false)
    private Boolean isAccountLocked;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    @Override
    public String toString() {
        return "Users{" +
                ", username='" + this.email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + this.userRole +
                ", createdAt=" + this.createdAt +
                ", isPasswordExpired=" + this.isPasswordExpired +
                ", isAccountLocked=" + this.isAccountLocked +
                '}';
    }
}
