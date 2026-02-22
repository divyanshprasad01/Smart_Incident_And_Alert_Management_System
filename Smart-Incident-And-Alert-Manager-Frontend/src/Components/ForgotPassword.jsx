import { useState } from "react";

// This components Renders a simple forgot password form with and email field and a submit button it also includes a link to switch to signup form.
// This is still using classic navigation technique and not using react router dom later will change it to use react router dom.
// It does nothing right now functionality to be implemented later right now it is just a UI component.
export default function ForgotPassword({ onSwitchForm }) {
  
  // To hold the input value.
  const [email, setEmail] = useState("");


  return (
    // Container to hold the form and the title.
    <>
    {/* Heading of the form */}
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password ?</h2>
    {/* Form. */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          // Notice no onSubmit or onClick handler for now.
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
      </form>
      {/* Gives an option to switch to signup page */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => onSwitchForm("signup")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
    </>
  );
}
