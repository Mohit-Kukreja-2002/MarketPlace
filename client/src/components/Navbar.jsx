import logo from '../assets/logobetter.png'
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/auth/useLogout'

// eslint-disable-next-line react/prop-types
const Navbar = ({ pageType = "home" }) => {
    const { loading, logout } = useLogout();

    const { setAuthUser } = useAuthContext();

    const handleLogout = async (e) => {
        e.preventDefault();
        const data = await logout();
        if (data.success===true) {
            setAuthUser("true");
        }
    }

    return (
        <div className="h-[80px] p-1 navbar shadow-custom">
            <div className={`my-auto mx-auto ${pageType === "home" ? "800px:ml-4 800px:sm:ml-8 800px:lg:ml-10" : "ml-4 sm:ml-8 lg:ml-10 navbar-start"}`}>
                <a className="cursor-pointer">
                    <img className="w-[90px]" src={logo} alt="" />
                </a>
            </div>
            <div className={`mr-3 sm:mr-6 lg:mr-10`}>
                <div className={`hidden ${pageType === 'home' ? "800px:flex " : ""}`}>
                    <input type="email" placeholder="Email" className="w-[180px] max-w-xs mr-2 bg-white input input-bordered input-warning" />
                    <input type="password" placeholder="Password" className="w-[180px] max-w-xs mr-2 bg-white input input-bordered input-warning" />
                    <button className='p-2 text-white px-4 bg-[#e9611e] rounded-[8px] border hover:bg-[#ab293f]'>
                        Login
                    </button>
                </div>
                <div className={`${pageType === 'profile' ? "flex" : "hidden"}`}>
                    <button className="mr-2 btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li>
                                <a onClick={(e) => !loading && handleLogout(e)}>
                                    {loading ? <span className='loading loading-spinner'></span> : "Logout"}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar