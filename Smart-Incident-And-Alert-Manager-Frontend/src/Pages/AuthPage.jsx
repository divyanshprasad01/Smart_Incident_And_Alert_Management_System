import LoginForm from "../Components/LoginForm";
import ForgotPassword from "../Components/ForgotPassword";
import SignUpForm from "../Components/SignUpForm";
import { Routes, Route } from "react-router-dom";

// A simple authentication page to hold auth related components and forms.
export default function Login() {
  return (
    // Main container which holds the auth forms.
    <div className="h-screen w-screen flex items-center justify-center bg-slate-700">
      {/* Container which holds the auth form */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}
