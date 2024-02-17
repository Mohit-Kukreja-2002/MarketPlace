import '../index.css'
import SignUp from './SignUp'
import logo from '../assets/logobetter.png'
import consumer from '../assets/consumer.png'
import location from '../assets/location.png'
import seller from '../assets/seller.png'

// eslint-disable-next-line react/prop-types
const Hero = ({ pageType = "home" }) => {
    return (
        <div className='w-screen h-screen bg-center bg-cover bg-custom-svg'>
            <div className="h-[80px] p-1 navbar">
                <div className={`my-auto mx-auto ${pageType === "home" ? "800px:ml-4 800px:sm:ml-8 800px:lg:ml-10" : "ml-4 sm:ml-8 lg:ml-10 navbar-start"}`}>
                    <a className="cursor-pointer">
                        <img className="w-[90px]" src={logo} alt="" />
                    </a>
                </div>
                <div className={`mr-3 ${pageType === "home" ? "800px:navbar-end" : "hidden"} sm:mr-6 lg:mr-10`}>
                    <div className={`hidden 800px:flex ${pageType === 'home' ? "block" : "hidden"}`}>
                        <input type="email" placeholder="Email"
                            className="1000px:w-[350px] w-[200px] max-w-xs mr-2 bg-white input input-bordered input-warning" />
                        <input type="password" placeholder="Password"
                            className="1000px:w-[350px] w-[200px] max-w-xs mr-2 bg-white input input-bordered input-warning" />
                        <button className='p-2 text-white px-4 bg-[#e9611e] rounded-[8px] border hover:bg-[#ab293f]'>
                            Login
                        </button>
                    </div>
                    <div className={`${pageType === 'profile' ? "block" : "hidden"}`}>
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
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`800px:hidden block mt-4 mb-10`}>
                <div className={`w-[90%] mx-auto ${pageType === 'home' ? "" : "hidden"}`}>
                    <input type="email" placeholder="Email"
                        className="w-[100%] mb-4 bg-white input input-bordered input-warning" />
                    <input type="password" placeholder="Password"
                        className="w-[100%] mb-4 bg-white input input-bordered input-warning" />
                    <button
                        className='w-[100%] p-2 text-white px-4 bg-[#e9611e] rounded-[8px] border hover:bg-[#ab293f]'>
                        Login
                    </button>
                </div>
            </div>
            <div className="flex flex-col 800px:flex-row">
                <div className="my-auto 800px:w-[50%] z-10">
                    <div className='text-center 1500px:w-[65%] 1100px:w-[85%] w-[90%] mx-auto 1100px:mr-[-30px] 1200px:mr-[-60px] mt-0'>
                        <h1 className='font-[600] text-[19px] 800px:text-[22px] 900px:text-[26px] text-[#000000]'>
                            START SELLING & ESCALATE YOUR BUSINESS WITH
                            <span className='text-[#df5425]'> INDIA&apos;S LARGEST </span>
                            BUSINESS ECOMMERCE PLATFORM.
                        </h1>
                    </div>
                    <div className='flex mt-[15px] justify-center 800px:justify-end 1100px:mr-[-30px] 1200px:mr-[-60px]'>
                        <div className='flex w-[140px] 1000px:w-[180px] flex-col justify-center py-2 mx-2 text-center bg-white'>
                            <img className='mx-auto mb-auto' width={40} src={seller} alt="" />
                            <h1 className='text-[#20396e] mb-auto font-[600] text-[20px]'>1 Lakh+</h1>
                            <p className='text-[14px] mb-auto'>Seller Base</p>
                        </div>
                        <div className='flex w-[140px] 1000px:w-[180px] flex-col justify-center py-2 mx-2 text-center bg-white'>
                            <img className='mx-auto' width={40} src={consumer} alt="" />
                            <h1 className='text-[#20396e] font-[600] text-[20px]'>40 Lac+</h1>
                            <p className='text-[14px]'>On-Going SME Buyers Online</p>
                        </div>
                        <div className='flex w-[140px] 1000px:w-[180px] flex-col justify-center py-2 mx-2 text-center bg-white'>
                            <img className='mx-auto' width={40} src={location} alt="" />
                            <h1 className='text-[#20396e] font-[600] text-[20px]'>25K</h1>
                            <p className='text-[14px]'>Available on 25K+ Pincodes</p>
                        </div>
                    </div>
                </div>
                <div className="w-[90%] mr-4 mx-auto 800px:w-[50%] flex justify-center 
                800px:mt-[50px] mt-[20px]">
                    <SignUp />
                </div>
            </div>
        </div>
    )
}

export default Hero