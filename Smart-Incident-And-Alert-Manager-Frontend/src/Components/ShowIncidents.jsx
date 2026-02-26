import { useState, useEffect } from "react";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// A show incidents Component which shows the list of all the incidents in a table format with some basic details and also has a button to create a new incident and also handles on click for any incident to show the details of that incident in a new component.
// This component is a child of App.jsx
export default function ShowIncidents() {
  // State variable to store the list of incidents fetched from the backend API
  const [incidents, setIncidents] = useState([]);
  // useNavigate from react router dom to handle navigation.
  const navigate = useNavigate();

  // It fetches the list of all incidents from the backend API when the component is rendered.
  useEffect(() => {
    const oneTimeFetch = async () => {
      try {
        // Making a GET request using the AXIOs
        const response = await api.get("/incidents");
        console.log("Incidents response:", response.data); // Debugging log
        // updates the state variable with the freshly fetched data.
        setIncidents(response.data);
        toast.success("Incidents loaded successfully!");
      } catch (error) {
        console.error("Error fetching incidents:", error); //Debugging log
        toast.error("Failed to load incidents");
      }
    };
    oneTimeFetch();
  }, []);

  // Helper function to fix time zones and display the local time insted of UTC which is sent by the backend API.
  const formatDateTime = (dateTimeString) => {
    if(!dateTimeString) return "N/A"; // Handle null or undefined values
    // Append 'Z' to indicate that the time is in UTC and create a Date object.
    const date = new Date(dateTimeString + "Z");

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }); // This will convert the UTC time to local time based on the user's browser settings.
  };

  // Helper function to determine the background and text color based on the provided parameters.
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Highly_Critical":
        return "bg-red-200 text-red-800";
      case "Critical":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-green-100 text-green-600";
    }
  };
  // Helper function to determine the background and text color based on the provided parameters.
  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return "bg-blue-100 text-blue-600";
      case "In_Progress":
        return "bg-purple-100 text-purple-600";
      case "Resolved":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    // Main container which holds the table.
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      {/* A container which holds the title and create incident button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Incident Dashboard</h1>
        <button
          type="create"
          // Navigating to the create new incident component using react router dom when the button is clicked.
          onClick={() => navigate("createNewIncident")}
          className=" bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Create Incident +
        </button>
      </div>
      {/* The container which holds the table for all the incidents */}
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
            {/* Populates the rows of the table with the list of incidents */}
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                // When somone clicks on a row it navigates to the incident details page for that particular incident passing the incident id as a parameter in the URL using react router dom.
                onClick={() => navigate(`incidentEvents/${incident.id}`)}
                className="border-t hover:bg-slate-50 transition cursor-pointer"
              >
                <td className="p-3 font-medium">{incident.id}</td>
                <td className="p-3 text-gray-500 text-sm">
                  {formatDateTime(incident.creationDateTime)}
                </td>
                <td className="p-3">{incident.userId}</td>
                <td className="p-3">{incident.subject}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                      incident.severity,
                    )}`}
                  >
                    {incident.severity}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      incident.status,
                    )}`}
                  >
                    {incident.status}
                  </span>
                </td>

                <td className="p-3 text-gray-500 text-sm">
                  {formatDateTime(incident.lastUpdatedDateTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
