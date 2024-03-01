import UpdateProfile from "../components/profile/UpdateProfile";
import Sidebar from "../components/Sidebar"
import { useUserContext } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
const EditProfile = () => {
  const { user } = useUserContext();
  return (
    <div className="m-0 bg-white">
      <Sidebar active={1} />
      <div className={`p-4 bg-white ${!user.profileCompleted ? "mt-6" : ""} sm:ml-48 900px:ml-64`}>
        <div className='flex items-center justify-center py-10 sm:border-2 sm:border-gray-200 sm:border-dashed'>
          <UpdateProfile />
        </div>
      </div>
    </div >
  )
}

export default EditProfile