import { useState } from "react";
import api from "../Api/axios";
import toast from "react-hot-toast";

// A Sign up component which allows to create a new user.
export default function SignUp({ onSwitchForm }) {
  // State variables to hold the form data.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handles the form submission.
  const handleSubmit = async (e) => {
    // Prevents the default form submission behavior which would cause a page reload.
    e.preventDefault();
    // Checks if the password and confirm password fields match, if not it shows an error toast and stops the submission process.
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Sends a POST request to the backend enpoint to create a new user with provided details and a default user role for now is set to ADMIN will add functionality to select user roles in future.
      const response = await api.post("/auth/signup", {
        name: name,
        email: email,
        password: password,
        userRole: "Admin",
      });

      toast.success("Account created successfully!");
      // Switches to the login form after a successful signup.
      onSwitchForm("login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    }
  };

  return (
    // Main container for the sign-up form.
    <>
      {/* Heading for signup form */}
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      {/* Sign-up form */}
      <form className="space-y-4">
        {/* Name field */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Email field */}
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
        {/* Password field */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Confirm password field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      {/* A text with a link to switch to the login form if the user already has an account. */}
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <span
          onClick={() => onSwitchForm("login")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </>
  );
}
