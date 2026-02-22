import { useEffect, useState } from "react";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// Component to display incident details and associated events.
export default function IncidentEvents() {
  // Navigation and useParams from react router dom to handle navigation and URL parameters.
  const navigate = useNavigate();
  const { incidentId } = useParams();

  // State variables to hold incident details and List of events.
  const [subject, setSubject] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [incidentStatus, setIncidentStatus] = useState("Created");
  // Holds the list of events associated with the incidents.
  const [events, setEvents] = useState([]);
  // for handling the editing based on the edit button.
  const [EditingMode, setEditingMode] = useState(true);
  // for handling the action message.
  const [actionMessage, setActionMessage] = useState("");
  const [editModeStatus, setEditModeStatus] = useState(incidentStatus);

  // useEffect to fetch incident details and associated events when the component is populated, it automatically triggeres when the component is rendered.
  useEffect(() => {
    // async function.
    const fetchIncidentDetails = async () => {
      try {
        // Fetch the incident details using the incident ID from the backend API notice we are not using complete URL because we have already configured the base URL in the axios.
        const incidentResponse = await api.get(`/incidents/${incidentId}`);
        // Sets the incident details in state variables.
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
        // Fetches the events associated with the incident using the incident ID from the backend API.
        const EventsResponse = await api.get(`/incidents/${incidentId}/events`);
        // Sets the list of events in the state variable.
        const incidentEvents = EventsResponse.data;
        setEvents(incidentEvents);
      } catch (error) {
        toast.error("Failed to fetch incident events");
      }
    };
    fetchIncidentDetails();
  }, [incidentId]);

  // Funtcions to determine the background and text color based on the parameter just for a nice UI.
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
  // Funtcions to determine the background and text color based on the parameter just for a nice UI.
  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return "bg-blue-100 text-blue-600";
      case "In_Progress":
        return "bg-yellow-100 text-yellow-600";
      case "Resolved":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };


// function to handle save an event for the incident when the save event button is clicked in the edit mode.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to the backend API to create a new event for the incident with the required body.
    } catch (error) {
      toast.error("Failed to save event");
    }
}

  return (
    // Main page container with some styling using tailwind CSS.
    <div className="h-auto min-h-100 bg-slate-100 flex justify-center p-6">
      {/* Container which holds the incident details */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-8">
        {/* This container holds the heading and a show all incidents button */}
        <div className="flex items-center justify-between mb-6">
          {/* Heading with the incident ID */}
          <h1 className="text-2xl font-bold mb-6">Incident ID: {incidentId}</h1>
          {/* Button to show all incidents later will be replaced with edit button for editing  */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditingMode(true)}
              className={`${EditingMode ? "hidden" : "block"} bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition`}
            >
              Make an Action
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`${EditingMode ? "block" : "hidden"} bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition`}
            >
              Save Event
            </button>
            <button
              type="button"
              onClick={() => setEditingMode(false)}
              className={`${EditingMode ? "block" : "hidden"} bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition`}
            >
              Cancel
            </button>
          </div>
        </div>
        {/* A disabled form for now which holds the incident details for showing later will enable it using edit button. */}
        <form className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              disabled={true}
              placeholder="Loading subject..."
              value={subject}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              rows="4"
              disabled={true}
              placeholder="Loading description..."
              value={description}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Created By and Created At */}
          <div className="flex w-full gap-4 ">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Created By
              </label>
              <input
                type="text"
                disabled={true}
                placeholder="Loading created by..."
                value={createdBy}
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Created At
              </label>
              <input
                type="text"
                disabled={true}
                placeholder="Loading created at..."
                value={createdAt}
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Last Updated At
              </label>
              <input
                type="text"
                disabled={true}
                placeholder="Loading last updated at..."
                value={updatedAt}
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium mb-2">Severity</label>
            <input
              type="text"
              disabled={true}
              placeholder="Loading severity..."
              value={severity}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getSeverityColor(severity)}`}
            />
          </div>

          {/* Action Message */}
          <div className={`${(EditingMode)? "block" : "hidden"}`}>
            <label className="block text-sm font-medium mb-2">
              Action Message
            </label>
            <textarea
              rows="4"
              disabled={false}
              placeholder="Enter any message here for the action..."
              onChange={(e) => setActionMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={(EditingMode)? editModeStatus : incidentStatus}
              disabled={(!EditingMode)}
              onChange={(e) => setEditModeStatus(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${(EditingMode)? getStatusColor(editModeStatus) : getStatusColor(incidentStatus)}`}
            >
              <option className="bg-gray-100 text-gray-600"  value="Acknowledged">ACKNOWLEDGED</option>
              <option className="bg-yellow-100 text-yellow-600" value="In_Progress">IN PROGRESS</option>
              <option className="bg-green-100 text-green-600"  value="Resolved">RESOLVED</option>
              <option className="bg-red-200 text-red-800" value="Closed">CLOSED</option>
            </select>
          </div>
        </form>

        {/* A container for the events table */}
        <div className="overflow-x-auto mt-8">
          {/* A table which shows all the events for the incident */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left text-sm uppercase tracking-wider text-gray-600">
                <th className="p-3">Event Id</th>
                <th className="p-3">Action Message</th>
                <th className="p-3">Incident Status</th>
              </tr>
            </thead>

            <tbody>
              {/* Maps the events List to table rows. */}
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
                        event.incidentStatus,
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
