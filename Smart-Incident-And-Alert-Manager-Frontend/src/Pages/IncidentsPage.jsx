import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import ShowIncidents from "../Components/ShowIncidents";
import api from "../Api/axios"; 
import CreateIncident from "../Components/CreateIncident";
import IncidentEvents from "../Components/InidentEvents";
import { Routes, Route } from "react-router-dom";

export default function Incidents() {
  

  return (
    <div className="min-h-screen mt-20 bg-slate-100 p-8">
      <Routes>
        <Route path="/*" element={<ShowIncidents/>} />
        <Route path="/createNewIncident" element={<CreateIncident />} />
        <Route path="/incidentEvents/:incidentId" element={<IncidentEvents />} />
      </Routes>
    </div>
  )
}
