package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.controllers;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.CreateIncidentDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.IncidentResponseDto;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services.IncidentService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/incidents")
public class IncidentController {
    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @PostMapping
    public IncidentResponseDto createIncident(@RequestBody CreateIncidentDto createIncidentDto) throws Exception {
        Incident incident = incidentService.createIncident(
                createIncidentDto.getSubject(),
                createIncidentDto.getDescription(),
                createIncidentDto.getSeverity(),
                createIncidentDto.getUserId()
        );
        return mapToResponse(incident);
    }

    @GetMapping("/{id}")
    public IncidentResponseDto getIncidentByIncidentId(@PathVariable Long id) throws Exception {
        Incident incident = incidentService.getIncidentById(id);
        return mapToResponse(incident);
    }

    @GetMapping
    public List<IncidentResponseDto> getAllIncidents() throws Exception {
        List<Incident> incidents = incidentService.getAllIncidents();
        List<IncidentResponseDto> incidentResponseDtos = new ArrayList<>();
        for(Incident incident : incidents) {
            incidentResponseDtos.add(mapToResponse(incident));
        }
        return incidentResponseDtos;
    }

//    @GetMapping
//    public List<IncidentResponseDto> getIncidentsByUserId(Long userId) throws Exception {
//        List<Incident> incidents = incidentService.getIncidentsByUser(userId);
//        List<IncidentResponseDto> incidentResponseDtos = new ArrayList<>();
//        for(Incident incident : incidents) {
//            incidentResponseDtos.add(mapToResponse(incident));
//        }
//        return incidentResponseDtos;
//    }

    private IncidentResponseDto mapToResponse(Incident incident) {
        IncidentResponseDto incidentResponseDto = new IncidentResponseDto();
        incidentResponseDto.setCreationDateTime(incident.getCreatedAt());
        incidentResponseDto.setId(incident.getId());
        incidentResponseDto.setSubject(incident.getSubject());
        incidentResponseDto.setDescription(incident.getDescription());
        incidentResponseDto.setSeverity(incident.getSeverity());
        incidentResponseDto.setStatus(incident.getIncidentStatus());
        incidentResponseDto.setUserId(incident.getCreatedBy());
        incidentResponseDto.setLastUpdatedDateTime(incident.getUpdatedAt());

        return incidentResponseDto;
    }


}
