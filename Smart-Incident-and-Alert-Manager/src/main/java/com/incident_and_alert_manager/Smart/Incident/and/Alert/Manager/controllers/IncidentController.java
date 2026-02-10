package com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.controllers;

import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.DTOs.*;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Event;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.models.Incident;
import com.incident_and_alert_manager.Smart.Incident.and.Alert.Manager.services.IncidentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//Incident controller which uses path ../incidents/ and takes data using DTO's
@RestController
@RequestMapping("/incidents")
public class IncidentController {
    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @PostMapping
    public IncidentResponseDto createIncident(@Valid @RequestBody CreateIncidentDto createIncidentDto) throws Exception {
        Incident incident = incidentService.createIncident(
                createIncidentDto.getSubject(),
                createIncidentDto.getDescription(),
                createIncidentDto.getSeverity(),
                createIncidentDto.getUserId()
        );
        return mapToResponse(incident);
    }

    @PostMapping("/{id}/acknowledge")
    public IncidentResponseDto acknowledge(@PathVariable Long id,
                                           @Valid @RequestBody AcknowledgeIncidentDto acknowledgeIncidentDto)
                                            throws Exception {
        Incident incident = incidentService.getIncidentById(id);
        Incident acknowledgeIncident = incidentService.acknowledgeIncident(incident,acknowledgeIncidentDto.getMessage());
        return mapToResponse(acknowledgeIncident);
    }

    @PostMapping("/{id}/inProgress")
    public IncidentResponseDto inProgress(@PathVariable Long id,
                                          @Valid @RequestBody InProgressIncidentDto inProgressIncidentDto)
            throws Exception {
        Incident incident = incidentService.getIncidentById(id);
        Incident acknowledgeIncident = incidentService.inProgressIncident(incident,inProgressIncidentDto.getMessage());
        return mapToResponse(acknowledgeIncident);
    }

    @PostMapping("/{id}/resolved")
    public IncidentResponseDto resolved(@PathVariable Long id,
                                           @Valid @RequestBody ResolvedIncidentDto resolvedIncidentDto)
            throws Exception {
        Incident incident = incidentService.getIncidentById(id);
        Incident acknowledgeIncident = incidentService.resolvedIncident(incident, resolvedIncidentDto.getMessage());
        return mapToResponse(acknowledgeIncident);
    }


    @PostMapping("/{id}/closed")
    public IncidentResponseDto closed(@PathVariable Long id,
                                      @Valid @RequestBody CloseIncidentDto closeIncidentDto)
            throws Exception {
        Incident incident = incidentService.getIncidentById(id);
        Incident acknowledgeIncident = incidentService.closedIncident(incident,closeIncidentDto.getMessage());
        return mapToResponse(acknowledgeIncident);
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

    @GetMapping("{id}/events")
    public List<EventsDto> EventsOfIncident(@PathVariable Long id){
        Incident incident = incidentService.getIncidentById(id);
        List<Event> events = incidentService.getAllEventsOfIncident(incident);
        List<EventsDto> eventsDtos = new ArrayList<>();
        for(Event event : events) {
            eventsDtos.add(mapToEvent(event));
        }
        return eventsDtos;
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


//  Maps the data to DTO's to respond in the same manner.

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

    private EventsDto mapToEvent(Event event) {
        EventsDto eventDto = new EventsDto();
        eventDto.setId(event.getId());
        eventDto.setMessage(event.getAction());
        eventDto.setIncidentStatus(event.getIncidentStatus());
        return eventDto;
    }


}
