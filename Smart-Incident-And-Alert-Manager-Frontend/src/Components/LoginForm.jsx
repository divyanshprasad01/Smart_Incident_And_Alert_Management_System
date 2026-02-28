import { useState } from "react";
import api from "../Api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";

// Login form component
export default function Login({ onSwitchForm }) {
  // State variables for email and password fields.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthentication } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in by checking if authToken exists in localStorage
    const authtoken = localStorage.getItem("authToken");
    if (authtoken) {
      navigate("/incidents"); // Redirect to dashboard if already logged in
      toast.success("Welcome back!! You are already logged in. Redirecting to dashboard...");
    }
  }, [navigate]);

  // Handle form submission for login.
  const handleSubmit = async (e) => {
    // Prevents the default form submission behavior, which would cause a page reload.
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      // Using axios to send a POST request to the login endpoint with the required body.
      const response = await api.post("/auth/login", { email, password });
      // console.log("Login response:", response.data); // Debugging log
      // Extaracts the token from the response and stores it in localStorage and names it "authToken".
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      // displays a success toast using react hot toast to inform the user that login was successful.
      toast.success("Login successful!");

      // Sets the authentication state in the AuthContext with the user data and token.
      // Sets user data with email and sum dummy data for now as the backend is not providing any user data in the response it just provides a token for now.
      // Later will add a function to fetch user data using the token and will pass only token here and will fetch the user in authContext and set the user data there.
      setAuthentication(token);

      // Navigates the user to the dashboard page after successful login.
      navigate("/incidents");
    } catch (error) {
      // Shows any errors using error toast and logs them to console for debugging.
      console.error("Login error:", error); // Debugging log
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    // Main container for the login page.
    <>
      {/* Heading of the Login form */}
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {/* Login form with two input fields email and password and a button */}
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

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* A forgot password link to switch to forgot password component will later use react router dom to handle these switches */}
          <span
            onClick={() => onSwitchForm("forgotPassword")}
            className="block text-right w-full text-sm mt-1 text-blue-600 cursor-pointer hover:underline"
          >
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      {/* A link to switch to signup form will later handle this using react router dom */}
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
