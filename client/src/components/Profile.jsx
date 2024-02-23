import { useState } from "react"

/* eslint-disable react/prop-types */
const Profile = ({user}) => {
    const [isDropdownOpen,setIsDropDownOpen] = useState(false);
    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-lg shadow ">
                <div className="relative flex justify-end px-4 pt-4">
                    <button
                        onClick={()=>{setIsDropDownOpen(previous => !previous)}}
                        className="inline-block text-gray-500  hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
                        type="button"
                    >
                        <span className="sr-only">Open dropdown</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                        >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div
                        id="dropdown"
                        className={`z-30 ${isDropdownOpen ? "block absolute right-4 top-10 mt-1" : "hidden"} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow 
                        w-44`}
                    >
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                >
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                >
                                    Export Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 "
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center p-10">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={user?.avatar?.url || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                        alt="user image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                        {user.email.substring(0, user.email.indexOf("@"))}
                    </h5>
                    <span className="text-sm text-gray-500 ">
                        {user.shopName || "Update your shop name first"}
                    </span>
                    <span className="mt-1 text-[12px] text-gray-500 ">
                        {user.upi || "Update your upi"}
                    </span>
                    <div className="flex mt-4 md:mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                        >
                            Update Profile
                        </a>
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