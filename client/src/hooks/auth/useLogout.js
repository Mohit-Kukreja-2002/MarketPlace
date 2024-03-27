import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/v1/logoutSeller", {
				method: "GET",
			});

			const data = await res.json();
			if (data?.error) {
				throw new Error(data.error);
			}
			if(data?.success){
				toast.success("Logout Successful");
			}

			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(data);
				}, 400);
			});

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;