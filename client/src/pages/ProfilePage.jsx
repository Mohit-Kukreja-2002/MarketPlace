// import AddProduct from "../components/AddProduct"
// import Navbar from "../components/Navbar"
import { Navigate } from "react-router";
import Profile from "../components/profile/Profile";
import Sidebar from "../components/Sidebar"
import { useUserContext } from "../context/UserContext";
const ProfilePage = () => {
  const { user } = useUserContext();
  return (
    <div className="m-0 bg-white">
      <Sidebar active={1} />
      <div className={`p-4 bg-white ${!user.profileCompleted ? "m-0" : "sm:ml-48 900px:ml-64"}`}>
        <div className="p-4 rounded-lg">
          {
            (!user.profileCompleted)
              ? <Navigate to={'/editProfile'} />
              : <div>
                <Profile />
              </div>
          }
        </div>
      </div>
    </div >
  )
}

export default ProfilePage