import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import ShowIncidents from "../Components/ShowIncidents";
import api from "../Api/axios"; 
import CreateIncident from "../Components/CreateIncident";

export default function Incidents() {
      const [activeTab, setActiveTab] = useState("allIncidents")


  return (
    <div className="min-h-screen mt-20 bg-slate-100 p-8">
      {activeTab === "allIncidents" ? (
        <ShowIncidents setActiveTab={setActiveTab} />
      ) : (
        <CreateIncident setActiveTab={setActiveTab} />
      )}
    </div>
  )
}
