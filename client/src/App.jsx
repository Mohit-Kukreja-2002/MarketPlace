import { Toaster } from 'react-hot-toast'
import Hero from './components/Hero'
import useIsLoggedIn from './hooks/auth/useIsLoggedIn'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { useAuthContext } from './context/AuthContext';
// import Navbar from './components/Navbar'

function App() {
  const { findStatus } = useIsLoggedIn();
  const { authUser,setAuthUser } = useAuthContext()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function getStatus() {
      const data = await findStatus();
      if (data.verified) {
        setIsLoggedIn(true);
        setAuthUser(null);
      }
    }
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <div className={`h-screen bg-white`}>

      {
        isLoggedIn ?
          <Navbar />
          : <>
            <Hero />
            <Toaster />
          </>
      }
    </div>
  )
}

export default App
