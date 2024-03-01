// import { useState } from "react"
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';


/* eslint-disable react/prop-types */
const Profile = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    // const history = useHis
    
    const goToUpdateProfile = () => {
        // history.push('/updateProfile');
        navigate('/editProfile');
        
    };
    // const [isDropdownOpen, setIsDropDownOpen] = useState(false);
    return (
        <div className="flex items-center justify-center mt-20">
            <div className="max-w-[500px] bg-white border border-gray-200 rounded-lg shadow-md ">
                <div className="flex flex-col items-center p-10">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={user?.avatar?.url || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                        alt="user image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                        {user.email.substring(0, user.email.indexOf("@"))}
                    </h5>
                    <span className="text-base text-gray-500 ">
                        {user.shopName || "Update your shop name first"}
                    </span>
                    {
                        user.upi.length < user.phoneNumber.length+1
                            ? <>
                                <span className="mt-1 text-[12px] text-gray-500 ">
                                    {"@" + user.phoneNumber || "Update your phoneNumber"}
                                </span>
                                <span className="mt-1 text-[12px] text-gray-500 ">
                                    {user.upi || "Update your upi"}
                                </span>
                            </>
                            : <>
                                <span className="mt-1 text-[12px] text-gray-500 ">
                                    {user.upi || "Update your upi"}
                                </span>
                                <span className="mt-1 text-[12px] text-gray-500 ">
                                    {"@" + user.phoneNumber || "Update your phoneNumber"}
                                </span>
                            </>
                    }
                    
                    <div className="flex mt-4 cursor-pointer md:mt-6">
                        <div
                            onClick={goToUpdateProfile}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                        >
                            Update Profile
                        </div>
                        {/* <a
                            href="#"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ms-2 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                        >
                            Message
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile