import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateProduct = () => {
	const [loading, setLoading] = useState(false);

	const editProduct = async (values,id) => {
		const success = handleInputErrors(values);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/v1/editProduct/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({data: values}),
			});

			const data = await res.json();
			if (data.error) {
				toast.error(data.error);
				throw new Error(data.error);
			}
			if (data.success) {
				toast.success("Product updated successfully");
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

	return { loading, editProduct };
};
export default useUpdateProduct;

function handleInputErrors(values) {
	if (!values.productName) {
		toast.error("Please enter a product name");
		return false;
	}
	if (!values.price) {
		toast.error("Please enter product's price");
		return false;
	}
	if (!values.description) {
		toast.error("Please enter product's description");
		return false;
	}

	return true;
}