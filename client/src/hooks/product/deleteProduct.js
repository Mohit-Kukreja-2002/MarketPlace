import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
	const [loading, setLoading] = useState(false);

	const deleteProduct = async (id) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/v1/deleteProduct/${id}`, {
				method: "DELETE",
			});

			const data = await res.json();
			if (data.error) {
				toast.error(data.error);
				throw new Error(data.error);
			}
			if (data.success) {
				toast.success("Product deleted successfully");
			}
			// Return data after a 1-second delay
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

	return { loading, deleteProduct };
};

export default useDeleteProduct;