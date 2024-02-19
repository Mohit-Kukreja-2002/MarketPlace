import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
	const [loading, setLoading] = useState(false);

	const signup = async ({ email, password,confirmPassword }) => {
		const success = handleInputErrors({ email, password, confirmPassword });
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/v1/registerSeller", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, confirmPassword }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			if(data.success){
				toast.success(data.message);
				localStorage.setItem("activationToken",data.activationToken)
			}
			return data;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ email,password, confirmPassword }) {
	if (!email || !password || !confirmPassword) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 8) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	return true;
}