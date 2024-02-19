import { useState } from "react";
import toast from "react-hot-toast";

const useLogin = () => {
	const [loading, setLoading] = useState(false);

	const login = async ({ email, password }) => {
		const success = handleInputErrors({ email, password });
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/v1/loginSeller", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			if(data.success){
				toast.success("Login Successful");
			}

			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(data);
				}, 1000);
			});

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors({ email,password }) {
	if (!email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}