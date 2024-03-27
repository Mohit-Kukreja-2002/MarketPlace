import useIsLoggedIn from './hooks/auth/useIsLoggedIn'
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import { useUserContext } from './context/UserContext';
import useGetProduct from './hooks/getSellerProduct';
import { useProductContext } from './context/SellerProductContext';
import EditProfile from './pages/EditProfile';
import YourCategories from './pages/YourCategories';
import CreateProduct from './pages/CreateProduct';
import CategoriesProduct from './pages/CategoriesProduct';
import EditProduct from './pages/EditProduct';
import Chat from './pages/Chat';

function App() {
  const { findStatus } = useIsLoggedIn();
  const { authUser, setAuthUser } = useAuthContext()
  const { setProducts } = useProductContext()
  const { getProducts } = useGetProduct();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useUserContext();
  useEffect(() => {
    async function getStatus() {
      const data = await findStatus();
      if (data.verified) {
        setIsLoggedIn(true);
        setUser(data.seller);
        setAuthUser(true);
        const prodData = await getProducts();
        if (prodData.success) setProducts(prodData.productsByCategory);
      } else {
        setIsLoggedIn(false);
      }
    }
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <div className={`h-screen bg-white`}>
      <Routes>

        {/* Go to landing page */}
        <Route path='/' element={
          isLoggedIn
            ? <Navigate to={'/profile'} />
            : <LandingPage />
        } />

        {/* Go to profile Page */}
        <Route path='/profile' element={
          isLoggedIn
            ? <ProfilePage />
            : <Navigate to={'/'} />
        } />

        {/* Go to Edit Profile */}
        <Route path='/editProfile' element={
          isLoggedIn
            ? <EditProfile/>
            : <Navigate to={'/'} />
        } />

        {/* Go to Your Categories */}
        <Route path='/yourCategories' element={
          isLoggedIn
            ? <YourCategories/>
            : <Navigate to={'/'} />
        } />

        {/* Go to add product */}
        <Route path='/addProduct' element={
          isLoggedIn
            ? <CreateProduct/>
            : <Navigate to={'/'} />
        } />

        {/* Go to particular category */}
        <Route path='/category/:category' element={
          isLoggedIn
            ? <CategoriesProduct/>
            : <Navigate to={'/'} />
        } />

        {/* Go to edit product */}
        <Route path='/editProduct/:category/:id' element={
          isLoggedIn
            ? <EditProduct/>
            : <Navigate to={'/'} />
        } />

        {/* Go to Chat */}
        <Route path='/chat' element={
          isLoggedIn
          ? <Chat/>
          : <Navigate to={'/'} />
        } />
      </Routes>
    </div>
  )
}

export default App
