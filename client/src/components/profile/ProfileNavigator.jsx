
// const ProfileNavigator = () => {
//     return (
//         <div className={`p-4 bg-white ${!user.profileCompleted ? "m-0" : "sm:ml-48 900px:ml-64"}`}>
//             <div className="p-4 rounded-lg">
//                 {
//                     (!user.profileCompleted || active === 4) && <div className='flex items-center justify-center py-10 sm:border-2 sm:border-gray-200 sm:border-dashed'>
//                         <UpdateProfile />
//                     </div>
//                 }
//                 {
//                     user.profileCompleted &&
//                         (active === 1)
//                         ? <div>
//                             <Profile setActive={setActive} />
//                         </div>
//                         : (active === 2)
//                             ? <div>
//                                 <CategoryPage setSelectedCategory={setSelectedCategory} setActive={setActive} />
//                             </div>
//                             : (active === 5)
//                                 ? <div className="flex items-center justify-center py-10 1300px:bg-center 1300px:bg-cover bg-custom-svg">
//                                     <AddProduct setActive={setActive} />
//                                 </div>
//                                 : (active === 6)
//                                     ? <div>
//                                         <Products selectedCategory={selectedCategory} setActive={setActive} />
//                                     </div>
//                                     : ""
//                 }
//                 {/* <div className="flex items-center justify-center py-10 1300px:bg-center 1300px:bg-cover bg-custom-svg">
//             <AddProduct />
//         </div> */}

//                 {/* <div className='flex items-center justify-center py-10'>
//             <UpdateProfile />
//         </div> */}
//                 {/* <div className="grid grid-cols-3 gap-4 mb-4">
//             <div className="flex items-center justify-center h-24 rounded bg-gray-50 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center h-24 rounded bg-gray-50 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center h-24 rounded bg-gray-50 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//         </div>
//         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 ">
//             <p className="text-2xl text-gray-400 ">
//                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                 </svg>
//             </p>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//         </div>
//         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 ">
//             <p className="text-2xl text-gray-400 ">
//                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                 </svg>
//             </p>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center rounded bg-gray-50 h-28 ">
//                 <p className="text-2xl text-gray-400 ">
//                     <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                     </svg>
//                 </p>
//             </div>
//         </div> */}
//             </div>
//         </div>
//     )
// }

// export default ProfileNavigator