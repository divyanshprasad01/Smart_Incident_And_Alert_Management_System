import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import ForgotPassword from "../Components/ForgotPassword";
import SignUpForm from "../Components/SignUpForm";
export default function Login() {

  const [activeForm, setActiveForm] = useState("login");

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-700">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* <Routes path="/auth">
        <Route path="/login" element={<LoginForm onSwitchForm={setActiveForm} />} />
        <Route path="/signup" element={<SignUpForm onSwitchForm={setActiveForm} />} />
        <Route path="/forgot-password" element={<ForgotPassword onSwitchForm={setActiveForm} />} />
        </Routes> */}

        {activeForm === "login" && <LoginForm onSwitchForm={setActiveForm} />}
        {activeForm === "signup" && <SignUpForm onSwitchForm={setActiveForm} />}
        {activeForm === "forgotPassword" && <ForgotPassword onSwitchForm={setActiveForm} />}
      </div>
    </div>
  );
}
