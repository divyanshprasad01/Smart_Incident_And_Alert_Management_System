import { useState } from 'react'

import {Toaster} from 'react-hot-toast'
import AuthPage from './Pages/AuthPage'
import Navbar from './Components/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {

  return (
    <>
    <Toaster position='bottom-right' />
    <Navbar />
    <Routes>
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/*" element={<Navigate to="/auth" replace />} />
    </Routes>
    </>
  );
}

export default App
