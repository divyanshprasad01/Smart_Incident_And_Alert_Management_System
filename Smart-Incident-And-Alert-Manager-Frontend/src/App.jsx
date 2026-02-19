import { useState } from 'react'

import {Toaster} from 'react-hot-toast'
import AuthPage from './Pages/AuthPage'
import Incidents from './Pages/IncidentsPage'
import Navbar from './Components/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {

  return (
    <div>
      <Toaster position='bottom-right' />
      <Navbar />
      <Routes>
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/*" element={<Navigate to="/auth" replace />} />
        <Route path="/incidents/*" element={<Incidents />} />
      </Routes>
    </div>
  );
}

export default App
