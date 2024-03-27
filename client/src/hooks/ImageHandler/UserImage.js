import { useState } from "react";
import toast from "react-hot-toast";

const useAddUserImage = () => {
	const [loading, setLoading] = useState(false);

	const addImage = async (image) => {
		setLoading(true);
		try {
			const res = await fetch("/api/v1/addSellerImage", {
				method: "POST",
                headers: { "Content-Type": "application/json" },
				body: JSON.stringify({image:image})
			});
			const data = await res.json();
			if (data.error) {
                throw new Error(data.error);
			}
			// Return data after a delay
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(data);
				}, 500);
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	const removeImage = async (public_id) => {
		setLoading(true);
		try {
			const res = await fetch("/api/v1/deleteSellerImage", {
				method: "POST",
                headers: { "Content-Type": "application/json" },
				body: JSON.stringify({public_id})
			});
			const data = await res.json();
			if (data.error) {
                throw new Error(data.error);
			}
            return data;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, addImage, removeImage };
};
export default useAddUserImage;