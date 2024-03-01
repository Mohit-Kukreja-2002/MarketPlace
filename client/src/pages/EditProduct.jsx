import { Navigate } from "react-router";
import Sidebar from "../components/Sidebar"
import { useUserContext } from "../context/UserContext";
import UpdateProduct from "../components/product/UpdateProduct";

const EditProduct = () => {
    const { user } = useUserContext();
    return (
        <>
            <div className="m-0 bg-white">
                <Sidebar active={2} />
                <div className={`p-4 bg-white ${!user.profileCompleted ? "m-0" : "sm:ml-48 900px:ml-64"}`}>
                    <div className="p-4 rounded-lg">
                        {
                            (!user.profileCompleted)
                                ? <Navigate to={'/editProfile'} />
                                : <div className='flex items-center justify-center py-10 sm:border-2 sm:border-gray-200 sm:border-dashed'>
                                <UpdateProduct />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProduct
