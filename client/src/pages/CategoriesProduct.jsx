import { Navigate } from "react-router";
import Sidebar from "../components/Sidebar"
import { useUserContext } from "../context/UserContext";
import Products from "../components/product/Products";
const CategoriesProduct = () => {
    const { user } = useUserContext();
    return (
        <div className="m-0 bg-white">
            <Sidebar active={2} />
            <div className={`p-4 bg-white ${!user.profileCompleted ? "m-0" : "sm:ml-48 900px:ml-64"}`}>
                <div className="p-4 rounded-lg">
                    {
                        (!user.profileCompleted)
                            ? <Navigate to={'/editProfile'} />
                            : <div>
                                <Products />
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default CategoriesProduct