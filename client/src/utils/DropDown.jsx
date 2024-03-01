/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useDeleteProduct from "../hooks/product/deleteProduct";
import { useProductContext } from "../context/SellerProductContext";

const DropdownMenu = ({ category, id }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { products, setProducts} = useProductContext();
    const { deleteProduct, loading } = useDeleteProduct();

    const handleDelete = async () => {
        const data = await deleteProduct(id);
        const prevLen = products[category].length;
        if (data.success) {
            setProducts(prevProducts => {
                const updatedProducts = prevProducts[category].filter(product => product._id !== id);
                return { ...prevProducts, [category]: updatedProducts };
            });
            if(prevLen > 1) navigate(`/category/${category}`)
            else navigate('/yourCategories');
        }
    }

    return (
        <>
            <div className="absolute bottom-0 hidden mb-4 mr-2 space-y-2 transition-all duration-300 -right-16 group-hover:block group-hover:right-0">
                <button onClick={() => { navigate(`/editProduct/${category}/${id}`) }} className="flex items-center justify-center w-10 h-10 text-white transition bg-gray-900 hover:bg-blue-600">
                    <MdEdit size={20} />
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-white transition bg-gray-900 hover:bg-red-600">
                    <MdDelete onClick={() => setOpen(true)} size={20} />
                </button>
            </div>

            <div id="popup-modal" tabIndex="-1"
                className={`${open ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center 
            items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-md max-h-full p-4">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setOpen(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 text-center md:p-5">
                            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                            {
                                !loading ? <>
                                    <button onClick={handleDelete}
                                        data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                        Yes, I&apos;m sure
                                    </button>
                                    <button onClick={() => setOpen(false)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                </>
                                    :
                                    <>
                                        <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                            Deleting...
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DropdownMenu;

// <div className="absolute top-0 flex justify-end px-4 pt-4 right-2">
//     <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="inline-block text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
//         type="button"
//     >
//         <span className="sr-only">Open dropdown</span>
//         <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 16 3"
//         >
//             <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//         </svg>
//     </button>
//     <div className={`z-30 ${isOpen ? "block absolute right-4 top-10 mt-1" : "hidden"} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
//         <div className="py-2" aria-labelledby="dropdownButton">
//             <div onClick={
//                 ()=>{
//                     navigate(`/editProduct/${category}/${id}`)
//                 }
//                 } className="flex items-center justify-between cursor-pointer">
//                 <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     Edit
//                 </div>
//                 <MdEdit className="mr-2 text-gray-700"/>
//             </div>
//             <div className="flex items-center justify-between cursor-pointer">
//                 <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
//                     Delete
//                 </a>
//                 <MdDelete className="mr-2 text-red-600"/>
//             </div>
//         </div>
//     </div>
// </div>