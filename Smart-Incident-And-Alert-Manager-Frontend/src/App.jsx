import { useState } from 'react'

import {Toaster} from 'react-hot-toast'
import AuthPage from './Pages/AuthPage'
import Navbar from './Components/NavBar';

function App() {

  return (
    <>
    <Toaster position='bottom-right' />
    <Navbar />
    <AuthPage />
    </>
  );
}

export default App
