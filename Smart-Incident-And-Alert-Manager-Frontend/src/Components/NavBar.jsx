import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// A basic navigation bar component which shows the title of the application in future will add other features like user profile.
// Child of App.jsx
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userDetailsCardRef = useRef(null);
  const navigate = useNavigate();
  const { user , removeAuthentication } = useAuth();

// It handles the click outside the user details dropdown card if it is open and someone clicks outside of it then it will close the card by setting isOpen to false.
  useEffect(() => {
    // This function is called whenever there is a click event on the document.
    function handleClickOutside(event) {
      // checks  if the clicked target is inside the card or not if it is not inside the card then it will close the card.
      if (userDetailsCardRef.current && !userDetailsCardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

//  Adds an event listener to the document to listen for mousedown events which is triggered when the mouse button is pressed down and calls the handleClickOutside function to check if the click was outside the card and if so it will close the card by setting isOpen to false.
    document.addEventListener('mousedown', handleClickOutside);

//  return is used in useEffect to clean up the event listener when the component is unmounted or when the effect is re-run to prevent memory leaks and unintended behavior by removing the event listener from the document.
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
    {/* Only populate this  if user is  authenticated and user data is fetched from backend that is user state variable is not null */}
    {localStorage.getItem("authToken") && user && (

      // Gives the refernce to this div to userDetailsCardRef useRef is used to directly access the DOM element in React and manipulate it or read its properties and in this case we are using it to check if the click is outside the card or not.
      <div className="relative" ref={userDetailsCardRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center mr-9 gap-3 px-6 py-3 rounded-xl focus:outline-none"
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
          <div className="absolute right-0 mt-3 w-74 bg-slate-800 rounded-b-xl shadow-lg p-6 border-l border-b border-r border-slate-700 z-50">
            <div className="mb-6">
              <p className="text-sm text-gray-400">USER ID</p>
              <p className="text-l text-white font-bold">{user.id}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-400">EMAIL</p>
              <p className="text-l text-white font-bold">{user.email}</p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-400">USER ROLE</p>
              <p className="text-l text-white font-bold">{user.userRole}</p>
            </div>

            <button
              className="w-full mt-5 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
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