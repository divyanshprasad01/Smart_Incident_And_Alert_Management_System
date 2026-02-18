import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import api from "../api/axios"; 

export default function Incidents() {
  const [incidents, setIncidents] = useState([])

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


//    async function loadIncidents() {
//         try {
//           const response = await api.get("/incidents");
//           console.log("Incidents response:", response.data); // Debugging log
//           setIncidents(response.data);
//         } catch (error) {
//           console.error("Error fetching incidents:", error); //Debugging log
//           toast.error("Failed to load incidents");
//         }
//     }       

//     loadIncidents();
//   // Dummy data for now
//   useEffect(() => {
//     setIncidents([
//       {
//         id: 1,
//         subject: "Database Connection Failure",
//         severity: "HIGH",
//         status: "OPEN",
//         createdAt: "2026-02-18 10:30 AM",
//       },
//       {
//         id: 2,
//         subject: "API Timeout Issue",
//         severity: "MEDIUM",
//         status: "IN_PROGRESS",
//         createdAt: "2026-02-18 11:10 AM",
//       },
//       {
//         id: 3,
//         subject: "UI Rendering Bug",
//         severity: "LOW",
//         status: "RESOLVED",
//         createdAt: "2026-02-17 04:20 PM",
//       },
//     ])
//   }, [])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Highly_Critical":
        return "bg-red-100 text-red-600"
      case "Critical":
        return "bg-yellow-100 text-yellow-600"
      case "Medium":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
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
    <div className="min-h-screen mt-20 bg-slate-100 p-8">
      <div className="mx-auto bg-white shadow-md rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-6">
          Incident Dashboard
        </h1>

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
                  className="border-t hover:bg-slate-50 transition"
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
    </div>
  )
}
