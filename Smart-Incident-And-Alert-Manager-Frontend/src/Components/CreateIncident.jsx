// This component is a child of Incidents Page component which is itself a child of App.jsx.
import { useState } from "react";
import api from "../Api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


// This component renders a form that allows users to create a new incident.
export default function CreateIncident() {
  // Initializing useNavigate from react router dom to navigate to different routes.
  const navigate = useNavigate();

  // Using useState to manage all input fields instead of normal variables this allows easy render and error free rendering of the component.
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [loading, setLoading] = useState(false);


  const handleCreateIncident = async (e) => {
    // Preventing the default form submission behavior as default behavior refreshes the page and we want to handle SPAs (Single Page Application) behavior.
    e.preventDefault();
    // setting the loading state to true to disable the submit button until the request is complete this prevents multiple submissions for the same data.
    setLoading(true);
    try {     
      // Making a POST request using AXIOS to backend endpoint with the required data to create a new incident, The data is sent in JSON format. 
      const response = await api.post("/incidents", {
        subject : subject,
        description : description,
        severity : severity,
        userId : 1
      });

    // If the request is successful a toast is dipsplayed and fields are automatically cleared and user is navigated to all incidents page where they can see new entry in the list.
      toast.success("Incident created successfully!");
      setSubject("");
      setDescription("");
      setSeverity("Low");
      navigate("/incidents");
    } catch (error) {
      // If there is some error it displays an error toast.
      console.error("Error creating incident:", error);
      toast.error("Failed to create incident. Please try again.");
    } finally {
      // Finally block is used to re-enable the submit button by setting the state to false regardless of whether the request was successful or not.
      setLoading(false);
    }
  };


  return (
    // Page Layout.
    <div className="h-auto min-h-100 bg-slate-100 flex justify-center p-6">
    {/* Inside page layoute a container which holds the form */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-8">
      {/* Container which encapsulates the heading and show all incidents button */}
        <div className="flex items-center justify-between mb-6">
        {/* Heading of this page */}
          <h1 className="text-2xl font-bold mb-6">Create New Incident</h1>
          {/* Show all incidents button */}
          <button
            type="button"
            // This button function is handled using react router dom's useNavigate.
            onClick={() => navigate("/incidents")}
            className=" bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Show Open Incidents
          </button>
        </div>
        {/* Starting of Form to create a new incident with required fields */}
        <form className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              placeholder="Enter incident subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
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
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium mb-2">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="bg-gray-100 text-gray-600"  value="Low">LOW</option>
              <option className="bg-yellow-100 text-yellow-600" value="Medium">MEDIUM</option>
              <option className="bg-red-100 text-red-600"  value="Critical">CRITICAL</option>
              <option className="bg-red-200 text-red-800" value="Highly_Critical">HIGHLY CRITICAL</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // The button is disabled when loading is set to true.
            disabled={loading}
            // The form submission function.
            onClick={handleCreateIncident}
            className="w-auto  bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Incident"}
          </button>
        </form>
      </div>
    </div>
  );
}
