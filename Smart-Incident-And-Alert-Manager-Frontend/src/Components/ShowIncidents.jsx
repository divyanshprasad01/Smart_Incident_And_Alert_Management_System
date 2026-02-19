import { useState, useEffect } from "react";
import api from "../Api/axios"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function ShowIncidents() {
    const [incidents, setIncidents] = useState([])
    const navigate = useNavigate();

    useEffect( () => {
        const oneTimeFetch = async () => {
            try {
            const response = await api.get("/incidents");
            console.log("Incidents response:", response.data); // Debugging log
            setIncidents(response.data);
            toast.success("Incidents loaded successfully!");
            } catch (error) {
            console.error("Error fetching incidents:", error); //Debugging log
            toast.error("Failed to load incidents");
            }
        }
        oneTimeFetch();
    }, [])

     const getSeverityColor = (severity) => {
    switch (severity) {
      case "Highly_Critical":
        return "bg-red-200 text-red-800"
      case "Critical":
        return "bg-red-100 text-red-600"
      case "Medium":
        return "bg-yellow-100 text-yellow-600"
      case "Low":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-green-100 text-green-600"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return "bg-blue-100 text-blue-600"
      case "In_Progress":
        return "bg-purple-100 text-purple-600"
      case "Resolved":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

    return (
       <div className="mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6">
            Incident Dashboard
          </h1>
          <button
          type="create"
          onClick={() => navigate("createNewIncident")}
          className=" bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Create Incident +
        </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-slate-100 text-left text-sm uppercase tracking-wider text-gray-600">
                <th className="p-3">Incident Id</th>
                <th className="p-3">Created At</th>
                <th className="p-3">Created By User</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Updated</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => (
                <tr
                  key={incident.id}
                  onClick={() => navigate(`incidentEvents/${incident.id}`)}
                  className="border-t hover:bg-slate-50 transition cursor-pointer"
                >
                  <td className="p-3 font-medium">{incident.id}</td>
                <td className="p-3 text-gray-500 text-sm">{incident.creationDateTime}</td>
                <td className="p-3">{incident.userId}</td>
                  <td className="p-3">{incident.subject}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                        incident.severity
                      )}`}
                    >
                      {incident.severity}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        incident.status
                      )}`}
                    >
                      {incident.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500 text-sm">
                    {incident.lastUpdatedDateTime}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    )
}
