// import { Toaster } from 'react-hot-toast'
// import Hero from './components/Hero'
import useIsLoggedIn from './hooks/auth/useIsLoggedIn'
import { useEffect, useState } from 'react';
// import Navbar from './components/Navbar';
import { useAuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import { useUserContext } from './context/UserContext';
// import AddProduct from './components/AddProduct';
// import Navbar from './components/Navbar'

function App() {
  const { findStatus } = useIsLoggedIn();
  const { authUser,setAuthUser } = useAuthContext()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState({});
  const {setUser} = useUserContext();
  useEffect(() => {
    async function getStatus() {
      const data = await findStatus();
      if (data.verified) {
        setIsLoggedIn(true);
        setUser(data.seller);
      }else{
        setIsLoggedIn(false);
      }
      setAuthUser(null);
    }
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <div className={`h-screen bg-white`}>
      {
        isLoggedIn
        ? <ProfilePage/>
        : <LandingPage/>
      }
    </div>
  )
}

export default App
