/* eslint-disable react/prop-types */
import logo from '../assets/logobetter.png'
import { useState } from 'react'
import '../index.css'
import { useNavigate } from 'react-router';
import { useUserContext } from '../context/UserContext';
import useLogout from '../hooks/auth/useLogout';
import { useAuthContext } from '../context/AuthContext';

const Sidebar = ({ active }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { logout } = useLogout();
    const { user } = useUserContext();
    const navigate = useNavigate();
    const {setAuthUser } = useAuthContext();

    const handleLogout = async () => {
        const data = await logout();
        if (data.success) {
            setAuthUser(null);
        }
    }
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-2 border-b border-gray-300 shadow-sm">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center justify-start rtl:justify-end">
                            {
                                user.profileCompleted &&
                                <button onClick={() => setIsSidebarOpen(prevState => !prevState)}
                                    type="button" className={`inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden ${isSidebarOpen ? "bg-gray-100 ring-2 ring-gray-200 outline-none" : ""}`}>
                                    <span className="sr-only">Open sidebar</span>
                                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                            }
                            <a href="" className="flex ms-2 md:me-24">
                                <img src={logo} className="w-[80px]" alt="Sellorama Logo" />
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="relative flex-col items-center ms-3">
                                <div>
                                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 " aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-10 h-10 rounded-full" src={user.avatar?.url || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} alt="user photo" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* {user.profileCompleted && */}
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 sm:w-48 900px:w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} bg-white shadow-xl border-r border-2 border-gray-200 sm:translate-x-0`}>

                {/* <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar"> */}
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
                    <ul className="space-y-2 font-medium">
                        <li className='cursor-pointer'
                            onClick={() => navigate('/profile')}
                        >
                            <div className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${active === 1 ? "bg-gray-100" : ""} group`}>
                                <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${active === 1 ? "text-gray-900" : ""} group-hover:text-gray-900 `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                            </div>
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => navigate('/yourCategories')}
                        >
                            <div href="#" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${active === 2 ? "bg-gray-100" : ""} group`}>
                                <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${active === 2 ? "text-gray-900" : ""} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </div>
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => navigate('/chat')}
                        >
                            <div href="#" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${active === 3 ? "bg-gray-100" : ""} group`}>
                                <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${active === 3 ? "text-gray-900" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                            </div>
                        </li>

                        
                        <li className='cursor-pointer'>
                            <div onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
            {/* } */}
        </>
    )
}

export default Sidebar