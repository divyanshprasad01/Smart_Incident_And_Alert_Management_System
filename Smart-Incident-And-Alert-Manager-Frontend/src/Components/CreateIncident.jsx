import { useState } from "react";
import api from "../Api/axios"; 
import toast from "react-hot-toast";


export default function CreateIncident({setActiveTab}) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");  

return (
    <div className="h-auto min-h-100 bg-slate-100 flex justify-center p-6">

      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-8">
<div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6">
            Create New Incident
          </h1>
          <button
          type="create"
          onClick={() => setActiveTab("allIncidents")}
          className=" bg-blue-600 text-white mb-6 py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Show Open Incidents
        </button>
        </div>
        <form className="space-y-6">

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Subject
            </label>
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
            <label className="block text-sm font-medium mb-2">
              Severity
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Highly_Critical">Highly_Critical</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Create Incident
          </button>

        </form>

      </div>

    </div>
  )

}