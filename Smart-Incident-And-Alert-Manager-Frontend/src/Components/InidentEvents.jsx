import { useEffect, useState } from "react";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function IncidentEvents()  {
    const navigate = useNavigate();
    const { incidentId } = useParams();
  const [subject, setSubject] = useState( "");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState("");
  const [events , setEvents] = useState([]);
  const [severity, setSeverity] = useState("Low");
  const [incidentStatus, setIncidentStatus] = useState("Created");
  

    useEffect(() => {
        const fetchIncidentDetails = async () => {
            try{
                const incidentResponse = await api.get(`/incidents/${incidentId}`);
                const incidentData = incidentResponse.data;
                setSubject(incidentData.subject);
                setDescription(incidentData.description);
                setSeverity(incidentData.severity);
                setIncidentStatus(incidentData.status);
                setCreatedAt(incidentData.creationDateTime);
                setUpdatedAt(incidentData.lastUpdatedDateTime);
                setCreatedBy(incidentData.userId);
            } catch (error) {
                toast.error("Failed to fetch incident details");
            }


            try {
                const EventsResponse = await api.get(`/incidents/${incidentId}/events`);
                const incidentEvents = EventsResponse.data;
                setEvents(incidentEvents);
            } catch (error) {
                toast.error("Failed to fetch incident events");
            } 
        };
        fetchIncidentDetails();
    }, [incidentId]);

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
    <div className="h-auto min-h-100 bg-slate-100 flex justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6">Incident ID: {incidentId}</h1>
          <button
            type="button"
            onClick={() => navigate("/incidents")}
            className=" bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Show Open Incidents
          </button>
        </div>
        <form className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              disabled = {true}
              placeholder="Loading subject..."
              value={subject}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              rows="4"
              disabled = {true}
              placeholder="Loading description..."
              value={description}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
            {/* Created By and Created At */}
          <div className="flex w-full gap-4 ">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Created By</label>
            <input
              type="text"
              disabled = {true}
              placeholder="Loading created by..."
              value={createdBy}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Created At</label>
            <input
              type="text"
              disabled = {true}
              placeholder="Loading created at..."
              value={createdAt}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Last Updated At</label>
            <input
              type="text"
              disabled = {true}
              placeholder="Loading last updated at..."
              value={updatedAt}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium mb-2">Severity</label>
            <input
              type="text"
              disabled = {true}
              placeholder="Loading severity..."
              value={severity}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getSeverityColor(severity)}`}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <input
              type="text"
              disabled = {true}
              placeholder="Loading status..."
              value={incidentStatus}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(incidentStatus)}`}
            />
          </div>

        </form>
        <div className="overflow-x-auto mt-8">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-slate-100 text-left text-sm uppercase tracking-wider text-gray-600">
                <th className="p-3">Event Id</th>
                <th className="p-3">Action Message</th>
                <th className="p-3">Incident Status</th>

              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-3 font-medium">{event.id}</td>
                <td className="p-3 text-gray-500 text-sm">{event.message}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        event.incidentStatus
                      )}`}
                    >
                      {event.incidentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
