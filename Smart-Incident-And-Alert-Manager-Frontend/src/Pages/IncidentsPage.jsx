import ShowIncidents from "../Components/ShowIncidents";
import CreateIncident from "../Components/CreateIncident";
import IncidentEvents from "../Components/InidentEvents";
import { Routes, Route } from "react-router-dom";

// A page to which holds all the components related to Incidents and their lifcycle.
export default function Incidents() {
  

  return (
    <div className="min-h-screen mt-20 bg-slate-100 p-8">
    {/* Using react router dom to manage different incident related pages */}
      <Routes>
        <Route path="/*" element={<ShowIncidents/>} />
        <Route path="/createNewIncident" element={<CreateIncident />} />
        <Route path="/incidentEvents/:incidentId" element={<IncidentEvents />} />
      </Routes>
    </div>
  )
}
