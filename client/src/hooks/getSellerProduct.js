import { useState } from "react";
import toast from "react-hot-toast";

const useGetProduct = () => {
	const [loading, setLoading] = useState(false);

	const getProducts = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/v1/getSellerProductsByCategory", {
				method: "GET",
			});

			const data = await res.json();
			if (data.error) {
				toast.error(data.error);
				throw new Error(data.error);
			}
            return data;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, getProducts };
};
export default useGetProduct;