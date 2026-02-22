import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import ForgotPassword from "../Components/ForgotPassword";
import SignUpForm from "../Components/SignUpForm";
// A simple authentication page to hold auth related components and forms.
export default function Login() {
  // State to track which form is currently active (login, signup, or forgot password)
  // Will later change this to use react router dom to handle form switching.
  const [activeForm, setActiveForm] = useState("login");

  return (
    // Main container which holds the auth forms.
    <div className="h-screen w-screen flex items-center justify-center bg-slate-700">
      {/* Container which holds the auth form */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* See using && in javaScript returns what is on the right side of && if the condition is true */}
        {activeForm === "login" && <LoginForm onSwitchForm={setActiveForm} />}
        {activeForm === "signup" && <SignUpForm onSwitchForm={setActiveForm} />}
        {activeForm === "forgotPassword" && (
          <ForgotPassword onSwitchForm={setActiveForm} />
        )}
      </div>
    </div>
  );
}
