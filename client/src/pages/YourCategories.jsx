import { Navigate } from "react-router";
import Sidebar from "../components/Sidebar"
import { useUserContext } from "../context/UserContext";
import CategoryPage from "../components/product/CategoryPage"
const YourCategories = () => {
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
                                <CategoryPage/>
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default YourCategories