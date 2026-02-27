import React, { useState, useRef, useEffect, use } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// A basic navigation bar component which shows the title of the application in future will add other features like user profile.
// Child of App.jsx
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userDetailsCardRef = useRef(null);
  const navigate = useNavigate();
  const { user , removeAuthentication } = useAuth();


  useEffect(() => {
    function handleClickOutside(event) {
      if (userDetailsCardRef.current && !userDetailsCardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-slate-800 text-white px-6 py-4 flex items-center justify-between space-x-4 shadow-lg">
    {/* App Name */}
      <h1 className="text-2xl font-semibold tracking-wide">
        Smart Incident Manager
      </h1>

    {/* User Profile Icon */}
    {localStorage.getItem("authToken") && (
      <div className="relative" ref={userDetailsCardRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center mr-7 gap-3 px-6 py-3 rounded-xl focus:outline-none"
        >
          {/* User Icon */}
          <div className="w-12 h-12 rounded-full bg-white text-slate-800 flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Username */}
          <span className="text-white-700 font-medium">
            {user.name}
          </span>
        </button>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-74 bg-white rounded-b-xl shadow-lg p-4 border z-50">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="text-gray-900">{user.mobileNumber}</p>
            </div>

            <div className="mb-7">
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="text-gray-800">{user.userSince}</p>
            </div>

            <button
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => {
                // call logout API
                console.log("Sign out clicked");
                removeAuthentication();
                navigate("/auth");
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    )}

    </nav>
  )
}