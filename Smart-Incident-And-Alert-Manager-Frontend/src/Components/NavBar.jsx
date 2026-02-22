// A basic navigation bar component which shows the title of the application in future will add other features like user profile.
// Child of App.jsx
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-slate-800 text-white px-6 py-5 flex items-center justify-left space-x-4 shadow-lg">
      <h1 className="text-2xl font-semibold tracking-wide">
        Smart Incident Manager
      </h1>

    </nav>
  )
}