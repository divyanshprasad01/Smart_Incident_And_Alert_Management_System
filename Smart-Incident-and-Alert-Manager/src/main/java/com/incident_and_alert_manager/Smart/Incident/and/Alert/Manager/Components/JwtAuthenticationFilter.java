package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.Components;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.Configurations.UserDetailsServiceConf;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

//Jwt Authentication filter logic in spring security filter chain, which extends OncePerRequestFilter class of spring security
//means every request will pass from this filter atleast once.

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceConf userDetailsService;
    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsServiceConf userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

//      Gets the value of Authorization field from Http request and stores it in string.
        String header = request.getHeader("Authorization");
//      If Jwt token is passed it will start from Bearer and space if it is true then move ahead.
        if (header != null && header.startsWith("Bearer ")) {
//
//          Removes the Bearer and space part from the
//          field now we got only token which can be parsed using JwtUtil which we created.

            String token = header.substring(7);
            String username = jwtUtil.extractUsername(token);
//          Checks if user is already authenticated or not if not and context is null loads the user
//          and validates the token and if token is valid and user is valid then tells spring security
//          that user is authenticated now I have authenticated it and sets it in  context.
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if(jwtUtil.validateJwtToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails,
                                    null,
                                    userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

//        moves on with the other filters
        filterChain.doFilter(request, response);

    }
}
