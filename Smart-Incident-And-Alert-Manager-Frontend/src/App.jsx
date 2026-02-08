import { useState } from 'react'

import AuthPage from './Pages/AuthPage'
import Navbar from './Components/NavBar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <AuthPage />
    </>
  );
}

export default App
