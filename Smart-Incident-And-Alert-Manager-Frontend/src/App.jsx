import { AuthProvider } from "./Contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import AuthPage from "./Pages/AuthPage";
import Incidents from "./Pages/IncidentsPage";
import Navbar from "./Components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";

// Main app component, entry point of the app.
function App() {
  return (
    <AuthProvider>
      <div>
        {/* React router toast to show toasts and notifications */}
        <Toaster position="bottom-right" />
        {/* Navbar */}
        <Navbar />
        {/* Using react router dom to route between different pages */}
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          {/* If user opens any other route which is not defiend it automatically redirects to the auth page */}
          <Route path="/*" element={<Navigate to="/auth" replace />} />
          <Route path="/incidents/*" element={<Incidents />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
