import { useState } from "react";
import api from "../Api/axios"; 
import toast from "react-hot-toast";

export default function Login({ onSwitchForm }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("Login response:", response.data); // Debugging log
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");

    } catch (error) {
      console.error("Login error:", error); // Debugging log
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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
          <span onClick={() => onSwitchForm("forgotPassword")} className="block text-right w-full text-sm mt-1 text-blue-600 cursor-pointer hover:underline">
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
